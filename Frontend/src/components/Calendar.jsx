import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';

function Calendar({ userid }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userid) {
      fetchEvents();
    }
  }, [userid]);

  const fetchEvents = async () => {
    try {
      const uidString = typeof userid === 'object' ? userid.uid : userid;
      console.log("Fetching events for user:", uidString);

      const response = await axios.get(`http://localhost:8000/api/${uidString}/tasks`);
      const data = response.data;
      console.log("Raw API response:", data);

      if (!data.tasks) {
        console.log("No tasks found in response:", data);
        setEvents([]);
        return;
      }

      const formattedEvents = formatEvents(data.tasks);
      console.log("Formatted calendar events:", formattedEvents);
      setEvents(formattedEvents);
      setError(null);

    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again later.');
    }
  };

  const formatEvents = (tasks) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks
      .filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .map(event => ({
        id: event.id,
        title: event.title,
        date: new Date(event.date).toISOString().split('T')[0],
        color: getCategoryColor(event.category),
        extendedProps: {
          description: event.description,
          category: event.category
        }
      }));
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'exam': return '#EF4444';
      case 'submission': return '#EAB308';
      case 'event': return '#22C55E';
      default: return '#3B82F6';
    }
  };

  const handleEventDrop = async (info) => {
    try {
      const uidString = typeof userid === 'object' ? userid.uid : userid;
      const taskId = info.event.id;
      const newDate = info.event.startStr;

      console.log(`Updating task ${taskId} to date ${newDate}`);

      // Show updating feedback
      const originalEvents = [...events];
      setEvents(events.map(event => 
        event.id === taskId 
          ? { ...event, date: newDate }
          : event
      ));

      // Make API call to update the task
      await axios.patch(`http://localhost:8000/api/${uidString}/tasks/${taskId}`, {
        date: newDate
      });

      console.log('Task updated successfully');

    } catch (error) {
      console.error('Error updating task:', error);
      // Revert the change in case of error
      setError('Failed to update task. Changes reverted.');
      fetchEvents(); // Refresh events from server
    }
  };

  const handleEventClick = (info) => {
    alert(
      `Event Details:\n` +
      `Title: ${info.event.title}\n` +
      `Date: ${info.event.startStr}\n` +
      `Category: ${info.event.extendedProps.category}\n` +
      `Description: ${info.event.extendedProps.description}`
    );
  };

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}
        events={events}
        eventClick={handleEventClick}
        editable={true}
        droppable={true}
        eventDrop={handleEventDrop}
        selectable={true}
        dayMaxEvents={3}
        height="auto"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }}
        eventDisplay="block"
        eventBackgroundColor="var(--event-color)"
        eventBorderColor="transparent"
        eventTextColor="white"
      />
    </div>
  );
}

export default Calendar;