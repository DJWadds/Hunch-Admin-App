const events = [
    {   id: 'wcg2',
        name: 'World Cup Game 2',
        type: 'Football',
        date: '2018-06-14 14:00:00'
    },
    {   id: 'wcg1',
        name: 'World Cup Game 1',
        type: 'Football',
        date: '2018-06-14 12:00:00'
    },
    {   id: 'bbg1',
        name: 'Baseball Game 1',
        type: 'Baseball',
        date: '2018-06-15 15:00:00'
    },
    {   id: 'tlf',
        name: 'London Final',
        type: 'Tennis',
        date: '2018-06-16 15:00:00'
    },
    {   id: 'f1r',
        name: 'F1 Race',
        type: 'Car Racing',
        date: '2018-06-12 15:00:00'
    },
    {   id: 'xfsf',
        name: 'X-Factor Final',
        type: 'TV Show',
        date: '2018-06-18 18:45:00'
    },
    {   id: 'rr19',
        name: 'Rat Race',
        type: 'Racing',
        date: '2019-05-11 08:00:00'
    },
    {   id: 'wcg8',
        name: 'World Cup Game 8',
        type: 'Football',
        date: '2018-06-25 15:00:00'
    }
]

exports.eventList = () => {
    return  events;
};

exports.getEvenById = (id) => {
    const event = events.filter(event => id === event.id);
    return event;
};