export const PageWrapper = ({ title, actions, children }) => (
  <div className="flex-1 p-6 lg:p-8 overflow-y-auto w-full">
    <div className="max-w-7xl mx-auto space-y-6">
      {(title || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  </div>
);
