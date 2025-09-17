"use client";
import { useEffect, useState, useRef } from "react";
import config from '../../config';

// Simple Rich Text Editor Component
function SimpleRichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || '';
    }
  }, []);

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

  return (
    <div className="border border-gray-300 rounded overflow-hidden">
      <div className="bg-gray-100 p-2 border-b border-gray-300 flex flex-wrap gap-1">
        <button 
          type="button"
          onClick={() => formatText('bold')} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button 
          type="button"
          onClick={() => formatText('italic')} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button 
          type="button"
          onClick={() => formatText('underline')} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="Underline"
        >
          <u>U</u>
        </button>
        <button 
          type="button"
          onClick={() => formatText('insertOrderedList')} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="Numbered List"
        >
          1.
        </button>
        <button 
          type="button"
          onClick={() => formatText('insertUnorderedList')} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="Bullet List"
        >
          •
        </button>
        <button 
          type="button"
          onClick={() => formatText('createLink', prompt('Enter link URL'))} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          title="Insert Link"
        >
          🔗
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="p-3 min-h-[200px] focus:outline-none"
        onInput={handleInput}
        onBlur={handleInput}
      />
    </div>
  );
}

// API URL for places
const API_URL = config.ENDPOINTS.PLACES;

export default function PlacesAdmin() {
  const [places, setPlaces] = useState([]);
  const [form, setForm] = useState({ 
    name: "", 
    location: "", 
    image: "",
    sections: [{ title: "", description: "" }] // Initialize with one empty section
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
    // Check API connection on component mount
    checkApiConnection();
    fetchPlaces();
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

  async function fetchPlaces() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      const data = await res.json();
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
      setStatusMessage({ 
        type: 'error', 
        text: `Failed to connect to backend server. Please make sure the backend is running at ${API_URL}` 
      });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setForm({ 
      name: "", 
      location: "", 
      image: "",
      sections: [{ title: "", description: "" }] // Initialize with one empty section
    });
    setSelectedFile(null);
    setPreviewImage(null);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEditModal(place) {
    // Convert existing description to sections if needed
    let sections = place.sections || [];
    
    // If no sections but has description, convert the old format to new format
    if (sections.length === 0 && place.description) {
      sections = [{ title: "Description", description: place.description }];
    }
    
    // Ensure at least one section exists
    if (sections.length === 0) {
      sections = [{ title: "", description: "" }];
    }
    
    setForm({
      name: place.name,
      location: place.location || '',
      image: place.image || '',
      sections: sections
    });
    setSelectedFile(null);
    setPreviewImage(place.image || null);
    setEditingId(place._id);
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
    if (!form.name) {
      setStatusMessage({ type: 'error', text: 'Name is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    // Validate sections
    if (!form.sections || form.sections.length === 0) {
      setStatusMessage({ type: 'error', text: 'At least one content section is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    // Check if any section is missing a title
    const invalidSections = form.sections.filter(section => !section.title.trim());
    if (invalidSections.length > 0) {
      setStatusMessage({ type: 'error', text: 'All sections must have a title' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    setLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    
    try {
      // For debugging
      console.log('Saving place with data:', form.name, form.location, `${form.sections.length} sections`);
      console.log('API URL:', url);
      console.log('Method:', method);
      
      let response;
      
      // Always use FormData to handle both file uploads and JSON data consistently
      const formData = new FormData();
      
      // Add basic form fields
      formData.append('name', form.name);
      formData.append('location', form.location || '');
      
      // Add sections as a JSON string
      try {
        const sectionsJson = JSON.stringify(form.sections);
        console.log('Sections JSON:', sectionsJson);
        formData.append('sections', sectionsJson);
      } catch (error) {
        console.error('Error stringifying sections:', error);
        throw new Error('Failed to process sections data');
      }
      
      // Add image if selected
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      
      // Log the form data for debugging
      console.log('Form data entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[0] === 'sections' ? '(JSON data)' : pair[1]));
      }
      
      // Make the fetch request
      response = await fetch(url, {
        method,
        // Don't set Content-Type header when using FormData
        // The browser will set it automatically with the correct boundary
        body: formData,
      });
      
      // Store the response for error handling
      const res = response;
      
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        console.error('Server error response:', errorText);
        setStatusMessage({ type: 'error', text: `Failed to save place: ${res.status} ${errorText}` });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      console.log('Response data:', data);
      
      setStatusMessage({ type: 'success', text: `Place ${editingId ? 'updated' : 'added'} successfully` });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      
      // Close the modal and refresh the places list
      closeModal();
      fetchPlaces();
    } catch (error) {
      console.error('Error saving place:', error);
      setStatusMessage({ type: 'error', text: `Error: ${error.message}` });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this place?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setStatusMessage({ type: 'error', text: 'Failed to delete' });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      } else {
        setStatusMessage({ type: 'success', text: 'Place deleted' });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
        fetchPlaces();
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
          <h3 className="text-2xl font-bold">Manage Places</h3>
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
            <span className="font-bold">+</span> Add Place
          </button>
        </div>
      </div>
      
      {/* Custom Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold">{editingId ? "Edit Place" : "Add Place"}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Name"
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="Location"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full max-h-40 object-contain border rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Content Sections</label>
                  <button 
                    type="button"
                    onClick={() => setForm(f => ({
                      ...f,
                      sections: [...f.sections, { title: "", description: "" }]
                    }))}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center gap-1"
                  >
                    <span className="font-bold">+</span> Add Section
                  </button>
                </div>
                
                {form.sections.map((section, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Section {index + 1}</h4>
                      {form.sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setForm(f => ({
                              ...f,
                              sections: f.sections.filter((_, i) => i !== index)
                            }));
                          }}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove section"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={e => {
                          const newSections = [...form.sections];
                          newSections[index].title = e.target.value;
                          setForm(f => ({ ...f, sections: newSections }));
                        }}
                        placeholder="Section Title"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <SimpleRichTextEditor
                        value={section.description}
                        onChange={(content) => {
                          const newSections = [...form.sections];
                          newSections[index].description = content;
                          setForm(f => ({ ...f, sections: newSections }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button 
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Reset loading state first to ensure button is clickable
                  resetLoadingState();
                  // Then call the handler
                  handleModalOk();
                }}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
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
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {places.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    'No places found. Add your first place using the button above.'
                  )}
                </td>
              </tr>
            ) : (
              places.map(place => (
                <tr key={place._id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="font-medium text-gray-900">{place.name}</div>
                    {/* Mobile-only location */}
                    <div className="sm:hidden text-sm text-gray-500 mt-1">{place.location}</div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4">{place.location}</td>
                  <td className="hidden md:table-cell px-6 py-4">
                    {place.image && (
                      <img src={place.image} alt={place.name} className="w-16 h-10 object-cover rounded" />
                    )}
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 max-w-xs">
                    <div className="truncate max-w-xs">
                      {place.sections && place.sections.length > 0 ? (
                        <span className="text-sm text-gray-600">{place.sections.length} section(s)</span>
                      ) : place.description ? (
                        <div dangerouslySetInnerHTML={{ __html: place.description }} />
                      ) : (
                        <span className="text-gray-400 italic">No content</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => openEditModal(place)} 
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 flex items-center gap-1 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(place._id)} 
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
