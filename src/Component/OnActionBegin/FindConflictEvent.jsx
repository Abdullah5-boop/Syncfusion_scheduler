export default function FindConflictEvent(eventData, appointmentData) {
  const startTime = new Date(eventData.StartTime);
  const endTime = new Date(eventData.EndTime);
  const resourceId = eventData.ResourceId;

  return appointmentData.find(evt => {
    // ignore same event during update
    if (evt.Id === eventData.Id) return false;

    // resource-wise conflict
    if (evt.ResourceId !== resourceId) return false;

    const evtStart = new Date(evt.StartTime);
    const evtEnd = new Date(evt.EndTime);

    // overlap condition
    return startTime < evtEnd && endTime > evtStart;
  });
}
