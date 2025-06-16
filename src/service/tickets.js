import API from './api.js'
import { STATUS_OPTIONS, PRIORITY_OPTIONS, TYPE_OPTIONS } from '../constants';

export async function fetchTickets() {
    const res = await API.get('/bugs');
    return res.data;
}

export async function createTicket(ticketData) {
    const res = await API.post('/bugs/add', ticketData);
    return res.data;
}

export async function updateTicket(ticketId, ticketData) {
    const res = await API.put(`/bugs/${ticketId}`, ticketData);
    return res.data;
}

export async function deleteTicket(ticketId) {
    const res = await API.delete(`/bugs/${ticketId}`);
    return res.data;
}

export async function fetchTicketsByType() {
    const tickets = await fetchTickets();
    const typeCounts = TYPE_OPTIONS.reduce((acc, type) => {
        acc[type] = 0;
        return acc;
    }, {});
    
    tickets.forEach(ticket => {
        typeCounts[ticket.type]++;
    });
    
    return typeCounts;
}

export async function fetchTicketsByPriority() {
    const tickets = await fetchTickets();
    const priorityCounts = PRIORITY_OPTIONS.reduce((acc, priority) => {
        acc[priority] = 0;
        return acc;
    }, {});
    
    tickets.forEach(ticket => {
        priorityCounts[ticket.priority]++;
    });
    
    return priorityCounts;
}

export async function fetchTicketsByStatus() {
    const tickets = await fetchTickets();
    const statusCounts = STATUS_OPTIONS.reduce((acc, status) => {
        acc[status] = 0;
        return acc;
    }, {});
    
    tickets.forEach(ticket => {
        statusCounts[ticket.status]++;
    });
    
    return statusCounts;
}

export async function fetchTicketsByProject(projectId) {
    const tickets = await fetchTickets();
    return tickets.filter(ticket => ticket.projectId === projectId);
}

export async function fetchTicketsByAssignee(userId) {
    const tickets = await fetchTickets();
    return tickets.filter(ticket => ticket.assignedTo === userId);
}

export async function fetchTicketsByReporter(userId) {
    const tickets = await fetchTickets();
    return tickets.filter(ticket => ticket.reportedBy === userId);
}