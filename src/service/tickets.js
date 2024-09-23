import API from './api.js'

export async function fetchTickets() {
    const res = await API.get('/bugs');
    return res.data;
}

export async function createTicket(ticketData) {
    const res = await API.post('/bugs/add', ticketData);
    return res.data;
}

// New functions
export async function fetchTicketsByType() {
    const tickets = await fetchTickets();
    const typeCounts = {
        Issues: 0,
        Bugs: 0,
        Features: 0
    };
    
    tickets.forEach(ticket => {
        if (ticket.type === 'Issue') typeCounts.Issues++;
        else if (ticket.type === 'Bug') typeCounts.Bugs++;
        else if (ticket.type === 'Feature') typeCounts.Features++;
    });
    
    return typeCounts;
}

export async function fetchTicketsByPriority() {
    const tickets = await fetchTickets();
    const priorityCounts = {
        Immediate: 0,
        High: 0,
        Medium: 0,
        Low: 0
    };
    
    tickets.forEach(ticket => {
        priorityCounts[ticket.priority]++;
    });
    
    return priorityCounts;
}

export async function fetchTicketsByStatus() {
    const tickets = await fetchTickets();
    const statusCounts = {
        Resolved: 0,
        New: 0,
        'In-Progress': 0
    };
    
    tickets.forEach(ticket => {
        if (ticket.status === 'Resolved') statusCounts.Resolved++;
        else if (ticket.status === 'Open') statusCounts.New++;
        else if (ticket.status === 'In Progress') statusCounts['In-Progress']++;
    });
    
    return statusCounts;
}