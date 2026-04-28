export default function AdminLoading() {
  const bar = (w: string, h = "h-3") => (
    <div
      className={`${h} rounded`}
      style={{ width: w, background: "var(--background-tertiary)" }}
    />
  );

  return (
    <div className="animate-pulse max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="space-y-2">
          {bar("14rem", "h-7")}
          {bar("22rem")}
        </div>
        <div className="h-9 w-32 rounded-lg" style={{ background: "var(--background-tertiary)" }} />
      </div>

      {/* Text fields card */}
      <div
        className="rounded-xl border p-6 mb-6"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        {bar("7rem")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              {bar("5rem")}
              <div className="h-9 rounded-md" style={{ background: "var(--background-tertiary)" }} />
            </div>
          ))}
          <div className="md:col-span-2 space-y-2">
            {bar("4rem")}
            <div className="h-20 rounded-md" style={{ background: "var(--background-tertiary)" }} />
          </div>
        </div>
      </div>

      {/* Items card */}
      <div
        className="rounded-xl border p-6"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <div className="flex items-center justify-between mb-5">
          {bar("6rem")}
          <div className="h-7 w-28 rounded-lg" style={{ background: "var(--background-tertiary)" }} />
        </div>
        <div className="flex flex-col gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="w-full" style={{ aspectRatio: "16/7", background: "var(--background-tertiary)" }} />
              <div className="p-4 grid grid-cols-2 gap-3">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="space-y-2">
                    {bar("5rem")}
                    <div className="h-9 rounded-md" style={{ background: "var(--background-tertiary)" }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
