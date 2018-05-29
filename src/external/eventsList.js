const events = [
    {   id: 'agdfhjksa',
        name: 'World Cup Game 2',
        type: 'Football',
        date: '2018-06-14 14:00:00'
    },
    {   id: 'agdfhjksfdga',
        name: 'World Cup Game 1',
        type: 'Football',
        date: '2018-06-14 12:00:00'
    },
    {   id: 'agdfhjdsffhgdxvksa',
        name: 'Baseball Game',
        type: 'Baseball',
        date: '2018-06-15 15:00:00'
    },
    {   id: 'agdfhjksdkgjhlrkjfkca',
        name: 'London Final',
        type: 'Tennis',
        date: '2018-06-16 15:00:00'
    },
    {   id: 'agdfjrkdgdhsbvhjksa',
        name: 'F1 Race',
        type: 'Car Racing',
        date: '2018-06-12 15:00:00'
    },
    {   id: 'agdfsfwehfhjksa',
        name: 'X-Factor Final',
        type: 'TV Show',
        date: '2018-06-18 18:45:00'
    },
    {   id: 'agdfhjkthtyjfsa',
        name: 'Rat Race',
        type: 'Racing',
        date: '2019-05-11 08:00:00'
    },
    {   id: 'agdfhrijdksalahjsdkjksa',
        name: 'World Cup Game 8',
        type: 'Football',
        date: '2018-06-25 15:00:00'
    }
]

exports.eventList = () => {
    return  events;
};

exports.getEvenById = (id) => {
    const event = events.filter.apply(event => id === event.id);
    return event;
};