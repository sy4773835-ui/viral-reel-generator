export function BackgroundDecor() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-pink-300/40 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-pink-200/50 blur-3xl animate-blob-slow" />
      <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-rose-200/40 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 left-1/2 h-[18rem] w-[18rem] rounded-full bg-pink-100/60 blur-3xl animate-float" />
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #be185d 1px, transparent 1px), linear-gradient(to bottom, #be185d 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
