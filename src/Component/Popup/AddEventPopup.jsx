export default function AddEventPopup() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl p-4">
        <div className="bg-neutral-primary-soft border rounded-base p-6">

          {/* Header */}
          <div className="flex justify-between border-b pb-4">
            <h3 className="text-lg font-medium">Add Event</h3>
            
          </div>

          {/* Body */}
          <div className="py-4">
            Custom event form goes here
          </div>

          {/* Footer */}
          <div className="flex gap-4 border-t pt-4">
            <button
             
              className="bg-brand text-white px-4 py-2 rounded"
            >
              Save
            </button>

           
          </div>

        </div>
      </div>
    </div>
  );
}
