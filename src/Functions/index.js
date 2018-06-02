exports.reduceToEventArray = (data) => {
    const events = Object.values(data);
    return events.sort(function(a, b) {
        return  +new Date(a.date) - +new Date(b.date);
    });
};