export default function OnDrag(args, child, line) {
    const target = args.event.target;
    const msInDay = 1000 * 60 * 60 * 24;
    let start_date = new Date(args.data.StartTime);
    let end_date = new Date(args.data.EndTime);
    // ✅ total days (inclusive)
    const total_days =
        Math.round((end_date - start_date) / msInDay) + 1;

    console.log("Total days:", total_days);
    

    // console.log("_".repeat(50), '\n', '* start * ')
    const cell = target.closest('.e-work-cells');
    if (!cell) return;

    const groupIndex = cell.getAttribute('data-group-index');
    const hole_child = child.find(c => c.Id === Number(groupIndex));
    let total = total_days + hole_child?.line_hover_hight
    console.log("Total days + line height : -> ", total );

    const clone = document.querySelector('.e-drag-clone');
    if (!clone) return;
    if (!clone.dataset.transitionApplied) {
        clone.dataset.transitionApplied = 'true';
        clone.style.transition = `
                background-color 150ms ease,
                border-radius 150ms ease,
                width 400ms ease
            `;
    }

    // 6️⃣ Visual updates
    clone.style.backgroundColor = '#7f06d1ff';
    clone.style.borderRadius = '6px';
   clone.style.width = `${total * 70}px`
}