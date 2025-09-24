"use client";
import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import config from '../../config';

// Enhanced Rich Text Editor Component
function SimpleRichTextEditor({ value, onChange, placeholder = "Enter content..." }) {
  const editorRef = useRef(null);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  // Handle content changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Format functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    handleInput();
    editorRef.current.focus();
  };

  const toolbarButtons = [
    { command: 'bold', icon: 'B', title: 'Bold' },
    { command: 'italic', icon: 'I', title: 'Italic' },
    { command: 'underline', icon: 'U', title: 'Underline' },
    { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
    { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
    { command: 'createLink', icon: '🔗', title: 'Insert Link', special: true }
  ];

  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 border-b border-gray-200 flex flex-wrap gap-2">
        {toolbarButtons.map((button, index) => (
          <button 
            key={index}
            type="button"
            onClick={() => button.special ? formatText(button.command, prompt('Enter link URL')) : formatText(button.command)} 
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
            title={button.title}
          >
            {button.icon}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[200px] focus:outline-none text-gray-700 leading-relaxed"
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        style={{
          '&:empty:before': {
            content: 'attr(data-placeholder)',
            color: '#9CA3AF',
            fontStyle: 'italic'
          }
        }}
      />
    </div>
  );
}

// API URL for events
const API_URL = config.ENDPOINTS.EVENTS;

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ 
    title: "",
    excerpt: "",
    content: "",
    image: "",
    location: "",
    startDate: "",
    endDate: "",
    organizer: "",
    highlights: [""],
    whyAttend: "",
    entryFee: "Free",
    contactInfo: {
      phone: "",
      email: "",
      website: ""
    },
    status: "upcoming",
    featured: false,
    tags: [""]
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ checked: false, working: false });

  useEffect(() => {
    checkApiConnection();
    fetchEvents();
  }, []);
  
  // Function to check if the API is accessible
  async function checkApiConnection() {
    try {
      const res = await fetch(API_URL, { method: 'HEAD' });
      setApiStatus({ checked: true, working: res.ok });
      console.log(`API connection check: ${res.ok ? 'Success' : 'Failed'} - Status: ${res.status}`);
    } catch (error) {
      console.error('API connection check failed:', error);
      setApiStatus({ checked: true, working: false });
    }
  }

  async function fetchEvents() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      const data = await res.json();
      setEvents(data.data || data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setStatusMessage({ 
        type: 'error', 
        text: `Failed to connect to backend server. Please make sure the backend is running at ${API_URL}` 
      });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setForm({ 
      title: "",
      excerpt: "",
      content: "",
      image: "",
      location: "",
      startDate: "",
      endDate: "",
      organizer: "",
      highlights: [""],
      whyAttend: "",
      entryFee: "Free",
      contactInfo: {
        phone: "",
        email: "",
        website: ""
      },
      status: "upcoming",
      featured: false,
      tags: [""]
    });
    setSelectedFile(null);
    setPreviewImage(null);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEditModal(event) {
    setForm({
      title: event.title || "",
      excerpt: event.excerpt || "",
      content: event.content || "",
      image: event.image || "",
      location: event.location || "",
      startDate: event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : "",
      endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : "",
      organizer: event.organizer || "",
      highlights: event.highlights && event.highlights.length > 0 ? event.highlights : [""],
      whyAttend: event.whyAttend || "",
      entryFee: event.entryFee || "Free",
      contactInfo: {
        phone: event.contactInfo?.phone || "",
        email: event.contactInfo?.email || "",
        website: event.contactInfo?.website || ""
      },
      status: event.status || "upcoming",
      featured: event.featured || false,
      tags: event.tags && event.tags.length > 0 ? event.tags : [""]
    });
    setSelectedFile(null);
    setPreviewImage(event.image || null);
    setEditingId(event._id);
    setModalOpen(true);
  }
  
  // Handle file selection
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  
  function closeModal() {
    setModalOpen(false);
  }

  // Reset loading state to ensure button is clickable
  function resetLoadingState() {
    setLoading(false);
  }

  async function handleModalOk() {
    // Validate form data
    if (!form.title) {
      setStatusMessage({ type: 'error', text: 'Title is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (!form.excerpt) {
      setStatusMessage({ type: 'error', text: 'Excerpt is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (!form.content) {
      setStatusMessage({ type: 'error', text: 'Content is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (!form.location) {
      setStatusMessage({ type: 'error', text: 'Location is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (!form.startDate) {
      setStatusMessage({ type: 'error', text: 'Start date is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (!form.endDate) {
      setStatusMessage({ type: 'error', text: 'End date is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (!form.organizer) {
      setStatusMessage({ type: 'error', text: 'Organizer is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    setLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    
    try {
      console.log('Saving event with data:', form.title, form.location);
      console.log('API URL:', url);
      console.log('Method:', method);
      
      let response;
      
      // Always use FormData to handle both file uploads and JSON data consistently
      const formData = new FormData();
      
      // Add basic form fields
      formData.append('title', form.title);
      formData.append('excerpt', form.excerpt);
      formData.append('content', form.content);
      formData.append('location', form.location);
      formData.append('startDate', new Date(form.startDate).toISOString());
      formData.append('endDate', new Date(form.endDate).toISOString());
      formData.append('organizer', form.organizer);
      formData.append('whyAttend', form.whyAttend || '');
      formData.append('entryFee', form.entryFee || 'Free');
      formData.append('status', form.status);
      formData.append('featured', form.featured);
      
      // Add highlights as JSON string
      const filteredHighlights = form.highlights.filter(h => h.trim() !== '');
      formData.append('highlights', JSON.stringify(filteredHighlights));
      
      // Add tags as JSON string
      const filteredTags = form.tags.filter(t => t.trim() !== '');
      formData.append('tags', JSON.stringify(filteredTags));
      
      // Add contact info as JSON string
      formData.append('contactInfo', JSON.stringify(form.contactInfo));
      
      // Add image if selected
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (form.image) {
        formData.append('image', form.image);
      }
      
      // Log the form data for debugging
      console.log('Form data entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[0] === 'highlights' || pair[0] === 'tags' || pair[0] === 'contactInfo' ? '(JSON data)' : pair[1]));
      }
      
      // Make the fetch request
      response = await fetch(url, {
        method,
        body: formData,
      });
      
      const res = response;
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        console.error('Server error response:', errorText);
        setStatusMessage({ type: 'error', text: `Failed to save event: ${res.status} ${errorText}` });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      console.log('Response data:', data);
      
      setStatusMessage({ type: 'success', text: `Event ${editingId ? 'updated' : 'added'} successfully` });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      
      // Close the modal and refresh the events list
      closeModal();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      setStatusMessage({ type: 'error', text: `Error: ${error.message}` });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setStatusMessage({ type: 'error', text: 'Failed to delete' });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      } else {
        setStatusMessage({ type: 'success', text: 'Event deleted' });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
        fetchEvents();
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Error: ' + error.message });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
    }
    setLoading(false);
  }

  return (
    <div className="p-4">
      {statusMessage.text && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded shadow-lg ${statusMessage.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} max-w-xs md:max-w-md`}>
          {statusMessage.text}
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold">Manage Events</h3>
          {apiStatus.checked && (
            <div className={`text-sm mt-1 ${apiStatus.working ? 'text-green-600' : 'text-red-600'}`}>
              API Status: {apiStatus.working ? 'Connected' : 'Not Connected'}
              <button 
                onClick={checkApiConnection} 
                className="ml-2 text-blue-500 underline"
              >
                Recheck
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded text-sm"
            onClick={() => {
              console.log('Debug - Current API URL:', API_URL);
              checkApiConnection();
            }}
          >
            Test API
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 ml-auto sm:ml-0"
            onClick={openAddModal}
          >
            <span className="font-bold">+</span> Add Event
          </button>
        </div>
      </div>
      
      {/* Enhanced Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{editingId ? "Edit Event" : "Add New Event"}</h3>
                    <p className="text-purple-100 text-sm">Manage your event information</p>
                  </div>
                </div>
                <button 
                  onClick={closeModal} 
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6 max-h-[calc(95vh-200px)] overflow-y-auto custom-scrollbar">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Event Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Enter event title"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    placeholder="Enter event location"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Brief description of the event"
                  required
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <SimpleRichTextEditor
                  value={form.content}
                  onChange={(content) => setForm(f => ({ ...f, content }))}
                />
              </div>

              {/* Dates and Organizer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="datetime-local"
                    value={form.startDate}
                    onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                  <input
                    type="datetime-local"
                    value={form.endDate}
                    onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organizer *</label>
                  <input
                    type="text"
                    value={form.organizer}
                    onChange={e => setForm(f => ({ ...f, organizer: e.target.value }))}
                    placeholder="Event Organizer"
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {previewImage && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Preview:</p>
                      <Image 
                        src={previewImage} 
                        alt="Preview" 
                        width={400}
                        height={160}
                        className="w-full max-h-40 object-contain border rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fee</label>
                  <input
                    type="text"
                    value={form.entryFee}
                    onChange={e => setForm(f => ({ ...f, entryFee: e.target.value }))}
                    placeholder="e.g., Free, ₹100, etc."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Why Attend */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Why Attend?</label>
                <textarea
                  value={form.whyAttend}
                  onChange={e => setForm(f => ({ ...f, whyAttend: e.target.value }))}
                  placeholder="Why should people attend this event?"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
                {form.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={e => {
                        const newHighlights = [...form.highlights];
                        newHighlights[index] = e.target.value;
                        setForm(f => ({ ...f, highlights: newHighlights }));
                      }}
                      placeholder="Event highlight"
                      className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {form.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newHighlights = form.highlights.filter((_, i) => i !== index);
                          setForm(f => ({ ...f, highlights: newHighlights }));
                        }}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, highlights: [...f.highlights, ''] }))}
                  className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Highlight
                </button>
              </div>

              {/* Contact Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Phone</label>
                    <input
                      type="text"
                      value={form.contactInfo.phone}
                      onChange={e => setForm(f => ({ 
                        ...f, 
                        contactInfo: { ...f.contactInfo, phone: e.target.value }
                      }))}
                      placeholder="Phone number"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Email</label>
                    <input
                      type="email"
                      value={form.contactInfo.email}
                      onChange={e => setForm(f => ({ 
                        ...f, 
                        contactInfo: { ...f.contactInfo, email: e.target.value }
                      }))}
                      placeholder="Email address"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Website</label>
                    <input
                      type="url"
                      value={form.contactInfo.website}
                      onChange={e => setForm(f => ({ 
                        ...f, 
                        contactInfo: { ...f.contactInfo, website: e.target.value }
                      }))}
                      placeholder="Website URL"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                {form.tags.map((tag, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={e => {
                        const newTags = [...form.tags];
                        newTags[index] = e.target.value;
                        setForm(f => ({ ...f, tags: newTags }));
                      }}
                      placeholder="Tag"
                      className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {form.tags.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newTags = form.tags.filter((_, i) => i !== index);
                          setForm(f => ({ ...f, tags: newTags }));
                        }}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, tags: [...f.tags, ''] }))}
                  className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Tag
                </button>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured Event
                </label>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="bg-gray-50 px-8 py-6 flex justify-end gap-4 border-t border-gray-200">
              <button 
                onClick={closeModal}
                className="btn btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  resetLoadingState();
                  handleModalOk();
                }}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {editingId ? 'Update Event' : 'Add Event'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    'No events found. Add your first event using the button above.'
                  )}
                </td>
              </tr>
            ) : (
              events.map(event => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="font-medium text-gray-900">{event.title}</div>
                    {/* Mobile-only location and dates */}
                    <div className="sm:hidden text-sm text-gray-500 mt-1">
                      <div>{event.location}</div>
                      <div className="text-xs">
                        {event.startDate && new Date(event.startDate).toLocaleDateString()} - 
                        {event.endDate && new Date(event.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4">{event.location}</td>
                  <td className="hidden md:table-cell px-6 py-4">
                    <div className="text-sm">
                      {event.startDate && new Date(event.startDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      to {event.endDate && new Date(event.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.status}
                    </span>
                    {event.featured && (
                      <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => openEditModal(event)} 
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 flex items-center gap-1 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(event._id)} 
                        className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 flex items-center gap-1 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
