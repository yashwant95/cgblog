"use client";
import { useEffect, useState, useRef } from "react";
import config from '../../config';

// Enhanced Rich Text Editor Component
function SimpleRichTextEditor({ value, onChange, placeholder = "Enter content..." }) {
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
      console.log('Fetched places data:', data);
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
    // Set preview image with proper URL
    const imageUrl = place.image ? 
      (place.image.startsWith('http') ? place.image : `${config.API_BASE_URL.replace('/api', '')}${place.image}`) : 
      null;
    setPreviewImage(imageUrl);
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
      
      // Add image if selected, otherwise preserve existing image
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (form.image) {
        // Preserve existing image URL when no new file is selected
        formData.append('existingImage', form.image);
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
      
      {/* Enhanced Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{editingId ? "Edit Place" : "Add New Place"}</h3>
                    <p className="text-blue-100 text-sm">Manage your destination information</p>
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
                  <label className="form-label">Place Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Enter place name"
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
                    placeholder="Enter location"
                    className="form-input"
                  />
                </div>
              </div>
              {/* Image Upload */}
              <div className="form-group">
                <label className="form-label">Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Click to upload image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </label>
                  {previewImage && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full max-h-48 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Content Sections */}
              <div className="form-group">
                <div className="flex justify-between items-center mb-4">
                  <label className="form-label">Content Sections</label>
                  <button 
                    type="button"
                    onClick={() => setForm(f => ({
                      ...f,
                      sections: [...f.sections, { title: "", description: "" }]
                    }))}
                    className="btn btn-secondary text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Section
                  </button>
                </div>
                
                <div className="space-y-4">
                  {form.sections.map((section, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">Section {index + 1}</h4>
                        {form.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setForm(f => ({
                                ...f,
                                sections: f.sections.filter((_, i) => i !== index)
                              }));
                            }}
                            className="btn btn-danger text-sm"
                            aria-label="Remove section"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        )}
                      </div>
                    
                      <div className="space-y-4">
                        <div className="form-group">
                          <label className="form-label">Section Title</label>
                          <input
                            type="text"
                            value={section.title}
                            onChange={e => {
                              const newSections = [...form.sections];
                              newSections[index].title = e.target.value;
                              setForm(f => ({ ...f, sections: newSections }));
                            }}
                            placeholder="Enter section title"
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Section Description</label>
                          <SimpleRichTextEditor
                            value={section.description}
                            onChange={(content) => {
                              const newSections = [...form.sections];
                              newSections[index].description = content;
                              setForm(f => ({ ...f, sections: newSections }));
                            }}
                            placeholder="Enter section description..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                    {editingId ? 'Update Place' : 'Add Place'}
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
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
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
                  <td className="px-6 py-4">
                    {place.image && (
                      <img 
                        src={place.image.startsWith('http') ? place.image : `${config.API_BASE_URL.replace('/api', '')}${place.image}`} 
                        alt={place.name} 
                        className="w-16 h-10 object-cover rounded" 
                        onError={(e) => {
                          console.error('Image failed to load:', e.target.src);
                          e.target.style.display = 'none';
                        }}
                        onLoad={() => console.log('Image loaded successfully:', place.image)}
                      />
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
