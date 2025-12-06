import { useEffect, useMemo, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Bot,
  CheckCircle2,
  Clock,
  Laptop,
  MessageCircle,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";

const mockIntuneData = {
  latestSync: "12:42 UTC",
  secureScore: 82,
  complianceSummary: {
    total: 1860,
    compliant: 1720,
    nonCompliant: 94,
    pending: 46,
    policiesFailing: 3,
  },
  deviceCollections: [
    { name: "Executive fleet", healthy: 58, degraded: 2, focus: "overview" },
    { name: "Operations laptops", healthy: 412, degraded: 24, focus: "endpoint" },
    { name: "Frontline tablets", healthy: 640, degraded: 38, focus: "alerts" },
  ],
  updateRings: [
    { name: "Pilot (50)", progress: 92, risk: "2 pending reboots" },
    { name: "Fast (250)", progress: 76, risk: "driver block on 3 devices" },
    { name: "Broad (1560)", progress: 41, risk: "waiting for night window" },
  ],
  autopilot: {
    ready: 142,
    pending: 8,
    blockers: ["Firmware baseline missing", "Wi-Fi profile outdated"],
  },
  alerts: [
    {
      id: "ITN-8721",
      severity: "High",
      summary: "Certificate chain expired for 12 Surface devices",
      owner: "PKI squad",
      eta: "45m",
      updated: "09:52",
    },
    {
      id: "ITN-8730",
      severity: "Medium",
      summary: "Frontline tablets skipped March update ring",
      owner: "Field ops",
      eta: "3h",
      updated: "09:20",
    },
    {
      id: "ITN-8684",
      severity: "Low",
      summary: "Two kiosk profiles awaiting compliance refresh",
      owner: "Kiosk crew",
      eta: "Today",
      updated: "08:10",
    },
  ],
  maintenanceTimeline: [
    {
      time: "09:00",
      title: "Pilot ring patch window",
      detail: "48/50 devices rebooted",
      status: "Closed",
    },
    {
      time: "11:30",
      title: "Broad ring safeguard hold review",
      detail: "Driver block tracked w/ vendor",
      status: "In flight",
    },
    {
      time: "14:00",
      title: "Frontline tablets compliance sweep",
      detail: "Focus on Wi-Fi drift",
      status: "Queued",
    },
  ],
  serviceHealth: [
    { name: "Endpoint security", status: "Operational" },
    { name: "Compliance policies", status: "Minor delay" },
    { name: "Device configuration", status: "Operational" },
  ],
};

const focusPrompts = {
  overview: {
    prompt: "Give me an executive summary for Intune health right now.",
    followups: [
      "Highlight only critical blockers",
      "Share a summary for leadership",
      "Drill into service health latency",
    ],
  },
  compliance: {
    prompt: "Break down today's compliance gaps with remediation owners.",
    followups: [
      "Which policies are failing the most?",
      "List non-compliant devices by priority",
      "Push a reminder to device owners",
    ],
  },
  endpoint: {
    prompt: "How healthy are our endpoint collections and autopilot pool?",
    followups: [
      "Show me autopilot blockers",
      "Are frontline tablets stable?",
      "Compare exec vs operations fleets",
    ],
  },
  alerts: {
    prompt: "Summarize open Intune alerts, owners, and ETA.",
    followups: [
      "Escalate high severity items",
      "Map alerts to impacted users",
      "Share RCA timeline",
    ],
  },
};

const quickPrompts = [
  "What changed since yesterday's patch window?",
  "Give me device compliance by platform.",
  "Any autopilot blockers for the new hires?",
  "List alerts impacting frontline workers.",
];

const severityColor = {
  High: "border-red-200 bg-red-50 text-red-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const focusFilters = [
  {
    id: "overview",
    label: "Unified overview",
    icon: <Sparkles size={16} />,
    selectedClass:
      "text-white border-transparent bg-gradient-to-r from-blue-600 to-violet-500 shadow-lg ring-2 ring-white/30",
  },
  {
    id: "compliance",
    label: "Compliance posture",
    icon: <ShieldCheck size={16} />,
    selectedClass:
      "text-white border-transparent bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg ring-2 ring-white/30",
  },
  {
    id: "endpoint",
    label: "Endpoint health",
    icon: <Activity size={16} />,
    selectedClass:
      "text-white border-transparent bg-gradient-to-r from-cyan-500 to-sky-500 shadow-lg ring-2 ring-white/30",
  },
  {
    id: "alerts",
    label: "Alerts & RCA",
    icon: <AlertTriangle size={16} />,
    selectedClass:
      "text-white border-transparent bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg ring-2 ring-white/30",
  },
];

const formatNumber = (value) => new Intl.NumberFormat().format(value);

const buildBotResponse = (question, focus) => {
  const normalized = question.toLowerCase();
  const compliance = mockIntuneData.complianceSummary;
  const complianceRate = Math.round((compliance.compliant / compliance.total) * 100);
  const atRisk = compliance.nonCompliant + compliance.pending;
  const highAlerts = mockIntuneData.alerts.filter((a) => a.severity === "High").length;

  const base = {
    meta: `Signals synced ${mockIntuneData.latestSync}`,
    followups: focusPrompts[focus]?.followups ?? focusPrompts.overview.followups,
  };

  if (normalized.includes("compliance") || focus === "compliance") {
    return {
      ...base,
      content: `Compliance sits at ${complianceRate}% (${compliance.compliant}/${compliance.total}). ${compliance.nonCompliant} devices are out of policy and ${compliance.pending} still need to report in. Three policies are failing: Conditional Access Baseline, Wi-Fi Drift Control, and BitLocker enforcement. Field Ops already owns remediation for 58% of the backlog.`,
      highlights: [
        `${compliance.nonCompliant} non-compliant devices`,
        `${compliance.pending} pending check-ins`,
        `${highAlerts} high severity alerts`,
      ],
    };
  }

  if (normalized.includes("alert") || normalized.includes("incident") || focus === "alerts") {
    const topAlert = mockIntuneData.alerts[0];
    return {
      ...base,
      content: `There are ${mockIntuneData.alerts.length} active alerts. ${topAlert.summary} is the most urgent with ${topAlert.owner} handling remediation and a ${topAlert.eta} ETA. Frontline tablets and pilot laptops are the primary impacted scopes. I can escalate or attach the RCA notes if you need them.`,
      highlights: [
        `${mockIntuneData.alerts.length} live alerts`,
        `${highAlerts} high severity`,
        `${topAlert.eta} ETA on ${topAlert.id}`,
      ],
    };
  }

  if (normalized.includes("autopilot") || normalized.includes("endpoint") || focus === "endpoint") {
    return {
      ...base,
      content: `${mockIntuneData.autopilot.ready} devices are ready for Autopilot today with ${mockIntuneData.autopilot.pending} waiting on fixes. Top blockers: ${mockIntuneData.autopilot.blockers.join(" and ")}. Executive fleet is green with 2 degraded devices, while operations laptops show 24 needing remediation.`,
      highlights: [
        `${mockIntuneData.autopilot.ready} Autopilot ready`,
        `${mockIntuneData.autopilot.pending} pending setup`,
        `Exec fleet: 2 degraded devices`,
      ],
    };
  }

  if (normalized.includes("patch") || normalized.includes("update")) {
    const pilot = mockIntuneData.updateRings[0];
    return {
      ...base,
      content: `Patch cadence: Pilot ring is ${pilot.progress}% complete with ${pilot.risk}. Fast ring trails at ${mockIntuneData.updateRings[1].progress}% due to driver validation and the broad ring opens again tonight. No safeguard holds were triggered overnight.`,
      highlights: mockIntuneData.updateRings.map((ring) => `${ring.name}: ${ring.progress}%`),
    };
  }

  if (normalized.includes("frontline") || normalized.includes("tablet")) {
    const frontline = mockIntuneData.deviceCollections[2];
    return {
      ...base,
      content: `${frontline.degraded} frontline tablets need attention. Wi-Fi drift and missed updates account for most of the issues. A compliance sweep is queued for 14:00 to reset profiles. I can send a pre-read to Field Ops if you like.`,
      highlights: [
        `${frontline.degraded} tablets degraded`,
        `Next sweep: 14:00`,
        `Owner: Field Ops`,
      ],
    };
  }

  return {
    ...base,
    content: `Intune is stable overall. Compliance is ${complianceRate}% with ${atRisk} devices needing nudges. ${highAlerts} high severity alerts remain open and Autopilot is ready for ${mockIntuneData.autopilot.ready} laptops. Want me to drill into any of these signals?`,
    highlights: [
      `${complianceRate}% compliant`,
      `${atRisk} devices pending`,
      `${mockIntuneData.alerts.length} live alerts`,
    ],
  };
};

export default function IntuneChatbot() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "bot",
      content:
        "Morning! I'm your Intune monitoring copilot. I stream compliance, endpoint, and alert telemetry every few minutes, so ask me anything about today's posture.",
      highlights: [
        `${mockIntuneData.complianceSummary.compliant}/${mockIntuneData.complianceSummary.total} compliant`,
        `${mockIntuneData.alerts.length} active alerts`,
        `${mockIntuneData.autopilot.ready} autopilot ready`,
      ],
      meta: `Service snapshot • synced ${mockIntuneData.latestSync}`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFocus, setSelectedFocus] = useState("overview");
  const viewportRef = useRef(null);

  const compliance = mockIntuneData.complianceSummary;
  const complianceRate = useMemo(
    () => Math.round((compliance.compliant / compliance.total) * 100),
    [compliance.compliant, compliance.total],
  );
  const atRisk = compliance.nonCompliant + compliance.pending;
  const highAlerts = mockIntuneData.alerts.filter((alert) => alert.severity === "High").length;

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = (promptText, focusOverride) => {
    const outbound = (typeof promptText === "string" ? promptText : input).trim();
    const focus = focusOverride ?? selectedFocus;
    if (!outbound) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: outbound,
      meta: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botPayload = buildBotResponse(outbound, focus);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "bot",
          ...botPayload,
        },
      ]);
      setLoading(false);
    }, 650 + Math.random() * 500);
  };

  const handleFocusChange = (focusId) => {
    setSelectedFocus(focusId);
    const focusPrompt = focusPrompts[focusId]?.prompt;
    if (focusPrompt) {
      handleSend(focusPrompt, focusId);
    }
  };

  const heroStats = [
    {
      label: "Managed endpoints",
      value: formatNumber(compliance.total),
      subLabel: "Live devices",
    },
    {
      label: "Compliant",
      value: `${complianceRate}%`,
      subLabel: `${compliance.compliant} devices good`,
    },
    {
      label: "High alerts",
      value: highAlerts,
      subLabel: "Needs attention",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-widest text-indigo-500 uppercase">Intune Copilot</p>
          <div className="flex flex-wrap items-baseline gap-4">
            <h1 className="text-3xl font-extrabold text-slate-900">Intune Monitoring Chatbot</h1>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              <CheckCircle2 size={14} /> Service healthy
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Clock size={14} /> Synced {mockIntuneData.latestSync}
            </span>
          </div>
          <p className="text-sm text-slate-600">
            Ask for compliance summaries, device health, alert timelines, or autopilot readiness with natural language. The assistant fuses Intune telemetry, ownership context, and remediation playbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/70 border border-slate-100 shadow-sm rounded-2xl p-4 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-widest text-slate-500">{stat.label}</p>
              <p className="text-3xl font-bold mt-2 text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.subLabel}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6">
          <Motion.section
            layout
            className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/40 p-6 flex flex-col"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {focusFilters.map(({ id, label, icon, selectedClass }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleFocusChange(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    selectedFocus === id
                      ? selectedClass
                      : "border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
                  }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            <div
              ref={viewportRef}
              className="flex-1 bg-slate-50 rounded-2xl p-4 mb-4 overflow-y-auto max-h-[520px] border border-slate-100"
            >
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <Motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                  >
                    {message.role === "bot" && (
                      <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <Bot size={20} />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed shadow ${
                        message.role === "bot"
                          ? "bg-white text-slate-800 border border-slate-100"
                          : "bg-indigo-600 text-white rounded-br-none"
                      }`}
                    >
                      <p>{message.content}</p>
                      {message.highlights && message.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                      {message.followups && message.followups.length > 0 && message.role === "bot" && (
                        <div className="mt-3 border-t border-slate-100 pt-3 space-y-1">
                          <p className="text-[11px] uppercase tracking-widest text-slate-400">Quick follow-ups</p>
                          <div className="flex flex-wrap gap-2">
                            {message.followups.map((followup) => (
                              <button
                                key={followup}
                                type="button"
                                onClick={() => handleSend(followup)}
                                className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
                              >
                                {followup}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {message.meta && (
                        <p className="text-[11px] mt-2 text-slate-400">{message.meta}</p>
                      )}
                    </div>
                    {message.role === "user" && (
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
                        <MessageCircle size={20} />
                      </div>
                    )}
                  </Motion.div>
                ))}

                {loading && (
                  <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center animate-pulse">
                      <RefreshCw size={18} className="animate-spin" />
                    </div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 text-sm text-slate-600">
                      Analyzing Intune signals…
                    </div>
                  </Motion.div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-2"
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything about Intune compliance, alerts, or devices…"
                className="flex-1 bg-transparent focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-2xl px-4 py-2 text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                disabled={!input.trim() || loading}
              >
                Send
                <Send size={16} />
              </button>
            </form>
          </Motion.section>

          <section className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-lg shadow-slate-200/40">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-emerald-500" size={18} />
                <p className="text-sm font-semibold text-slate-700">Key posture signals</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="border border-slate-100 rounded-2xl p-3">
                  <p className="text-xs text-slate-500">Secure score</p>
                  <p className="text-2xl font-semibold text-slate-900">{mockIntuneData.secureScore}%</p>
                  <p className="text-[11px] text-emerald-600 mt-1">+1.4% wk/wk</p>
                </div>
                <div className="border border-slate-100 rounded-2xl p-3">
                  <p className="text-xs text-slate-500">Devices at risk</p>
                  <p className="text-2xl font-semibold text-amber-600">{atRisk}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{compliance.pending} pending check-in</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {mockIntuneData.serviceHealth.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between text-xs border border-slate-100 rounded-2xl px-3 py-2"
                  >
                    <div className="flex items-center gap-2 text-slate-600">
                      <Wifi size={14} />
                      {service.name}
                    </div>
                    <span
                      className={`font-semibold ${
                        service.status === "Operational"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-lg shadow-slate-200/40">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-amber-500" size={18} />
                <p className="text-sm font-semibold text-slate-700">Live alerts</p>
              </div>
              <div className="space-y-3">
                {mockIntuneData.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-2xl border px-3 py-3 text-xs ${severityColor[alert.severity]}`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>
                        {alert.id} · {alert.severity}
                      </span>
                      <span>{alert.updated}</span>
                    </div>
                    <p className="mt-1 text-slate-700 text-sm">{alert.summary}</p>
                    <div className="flex justify-between text-[11px] mt-2 text-slate-500">
                      <span>Owner: {alert.owner}</span>
                      <span>ETA {alert.eta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-lg shadow-slate-200/40">
              <div className="flex items-center gap-2 mb-4">
                <Laptop className="text-indigo-500" size={18} />
                <p className="text-sm font-semibold text-slate-700">Update rings</p>
              </div>
              <div className="space-y-3">
                {mockIntuneData.updateRings.map((ring) => (
                  <div key={ring.name} className="text-sm">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{ring.name}</span>
                      <span>{ring.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${ring.progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{ring.risk}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-lg shadow-slate-200/40">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-slate-500" size={18} />
                <p className="text-sm font-semibold text-slate-700">Maintenance timeline</p>
              </div>
              <div className="space-y-4">
                {mockIntuneData.maintenanceTimeline.map((slot) => (
                  <div key={slot.time} className="flex gap-3 text-xs">
                    <div className="text-slate-500 w-16">{slot.time}</div>
                    <div>
                      <p className="text-slate-700 font-semibold">{slot.title}</p>
                      <p className="text-slate-500">{slot.detail}</p>
                      <span className="inline-flex mt-2 text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {slot.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
