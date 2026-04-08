type ConfirmDeleteModalProps = {
  open: boolean;
  isRange: boolean;
  onClose: () => void;
  onDeleteSingle: () => void;
  onDeleteAll?: () => void;
};

export default function ConfirmDeleteModal({
  open,
  isRange,
  onClose,
  onDeleteSingle,
  onDeleteAll,
}: ConfirmDeleteModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]"
      onClick={onClose}
    >
      <div
        className="w-[min(90vw,360px)] rounded-[16px] border border-[#c5b8ab] bg-[#f5efe6] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[16px] font-semibold text-[#1a1208]">Delete event?</h3>
        <p className="mt-2 text-[13px] text-[#9a8a7a]">
          {isRange
            ? "Choose whether to remove the event from this day only or all days in the range."
            : "This will remove the event from this day."}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] border border-[#c5b8ab] px-4 py-2 text-[12px] text-[#5a4a3a]"
          >
            Cancel
          </button>
          {isRange ? (
            <>
              <button
                type="button"
                onClick={onDeleteSingle}
                className="rounded-[8px] border border-[#c5b8ab] px-4 py-2 text-[12px] text-[#5a4a3a]"
              >
                This day
              </button>
              <button
                type="button"
                onClick={onDeleteAll}
                className="rounded-[8px] bg-[#3d2c1e] px-4 py-2 text-[12px] text-white"
              >
                All days
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onDeleteSingle}
              className="rounded-[8px] bg-[#3d2c1e] px-4 py-2 text-[12px] text-white"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
