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

// API URL for food
const API_URL = config.ENDPOINTS.FOOD;

export default function FoodAdmin() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ 
    name: "",
    description: "",
    shortDescription: "",
    image: "",
    category: "breakfast",
    cuisine: "chhattisgarhi",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [{ step: 1, description: "" }],
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: "easy",
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0
    },
    tags: [""],
    origin: "",
    history: "",
    culturalSignificance: "",
    bestTimeToEat: [],
    season: "all-season",
    priceRange: "budget",
    rating: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isSpicy: false,
    spiceLevel: 0,
    featured: false,
    status: "draft"
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
    fetchFoods();
  }, []);

  async function fetchFoods() {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.success) {
        setFoods(data.data || []);
        setApiStatus({ checked: true, working: true });
      } else {
        throw new Error(data.message || 'Failed to fetch foods');
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
      setStatusMessage({ type: 'error', text: `Error: ${error.message}` });
      setApiStatus({ checked: true, working: false });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setForm({ 
      name: "",
      description: "",
      shortDescription: "",
      image: "",
      category: "breakfast",
      cuisine: "chhattisgarhi",
      ingredients: [{ name: "", quantity: "", unit: "" }],
      instructions: [{ step: 1, description: "" }],
      prepTime: 0,
      cookTime: 0,
      servings: 1,
      difficulty: "easy",
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0
      },
      tags: [""],
      origin: "",
      history: "",
      culturalSignificance: "",
      bestTimeToEat: [],
      season: "all-season",
      priceRange: "budget",
      rating: 0,
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: false,
      spiceLevel: 0,
      featured: false,
      status: "draft"
    });
    setSelectedFile(null);
    setPreviewImage(null);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEditModal(food) {
    setForm({
      name: food.name || "",
      description: food.description || "",
      shortDescription: food.shortDescription || "",
      image: food.image || "",
      category: food.category || "breakfast",
      cuisine: food.cuisine || "chhattisgarhi",
      ingredients: food.ingredients && food.ingredients.length > 0 ? food.ingredients : [{ name: "", quantity: "", unit: "" }],
      instructions: food.instructions && food.instructions.length > 0 ? food.instructions : [{ step: 1, description: "" }],
      prepTime: food.prepTime || 0,
      cookTime: food.cookTime || 0,
      servings: food.servings || 1,
      difficulty: food.difficulty || "easy",
      nutrition: food.nutrition || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0
      },
      tags: food.tags && food.tags.length > 0 ? food.tags : [""],
      origin: food.origin || "",
      history: food.history || "",
      culturalSignificance: food.culturalSignificance || "",
      bestTimeToEat: food.bestTimeToEat || [],
      season: food.season || "all-season",
      priceRange: food.priceRange || "budget",
      rating: food.rating || 0,
      isVegetarian: food.isVegetarian !== undefined ? food.isVegetarian : true,
      isVegan: food.isVegan !== undefined ? food.isVegan : false,
      isGlutenFree: food.isGlutenFree !== undefined ? food.isGlutenFree : false,
      isSpicy: food.isSpicy !== undefined ? food.isSpicy : false,
      spiceLevel: food.spiceLevel || 0,
      featured: food.featured !== undefined ? food.featured : false,
      status: food.status || "draft"
    });
    setSelectedFile(null);
    setPreviewImage(food.image || null);
    setEditingId(food._id);
    setModalOpen(true);
  }
  
  // Handle file selection
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
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

    if (!form.description) {
      setStatusMessage({ type: 'error', text: 'Description is required' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      return;
    }

    setLoading(true);

    try {
      let imageUrl = form.image;

      // Handle file upload if a new file is selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          imageUrl = uploadResult.url;
        } else {
          console.warn('Image upload failed, using existing image URL');
        }
      }

      // Prepare food data
      const foodData = {
        ...form,
        image: imageUrl,
        // Clean up arrays - remove empty entries
        tags: form.tags.filter(tag => tag.trim() !== ''),
        ingredients: form.ingredients.filter(ing => ing.name.trim() !== ''),
        instructions: form.instructions.filter(inst => inst.description.trim() !== ''),
        // Ensure numeric fields are numbers
        prepTime: parseInt(form.prepTime) || 0,
        cookTime: parseInt(form.cookTime) || 0,
        servings: parseInt(form.servings) || 1,
        spiceLevel: parseInt(form.spiceLevel) || 0,
        rating: parseFloat(form.rating) || 0,
        // Ensure nutrition values are numbers
        nutrition: {
          calories: parseInt(form.nutrition.calories) || 0,
          protein: parseInt(form.nutrition.protein) || 0,
          carbs: parseInt(form.nutrition.carbs) || 0,
          fat: parseInt(form.nutrition.fat) || 0,
          fiber: parseInt(form.nutrition.fiber) || 0,
          sugar: parseInt(form.nutrition.sugar) || 0
        }
      };

      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      setStatusMessage({ type: 'success', text: `Food ${editingId ? 'updated' : 'added'} successfully` });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      
      // Close the modal and refresh the foods list
      closeModal();
      fetchFoods();
    } catch (error) {
      console.error('Error saving food:', error);
      setStatusMessage({ type: 'error', text: `Error: ${error.message}` });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
    } finally {
      setLoading(false);
    }
  }

  async function deleteFood(id) {
    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setStatusMessage({ type: 'success', text: 'Food deleted successfully' });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
        fetchFoods();
      } catch (error) {
        console.error('Error deleting food:', error);
        setStatusMessage({ type: 'error', text: `Error: ${error.message}` });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
      }
    }
  }

  // Helper functions for form management
  const addIngredient = () => {
    setForm(f => ({
      ...f,
      ingredients: [...f.ingredients, { name: "", quantity: "", unit: "" }]
    }));
  };

  const removeIngredient = (index) => {
    setForm(f => ({
      ...f,
      ingredients: f.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index, field, value) => {
    setForm(f => ({
      ...f,
      ingredients: f.ingredients.map((ing, i) => 
        i === index ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const addInstruction = () => {
    const nextStep = form.instructions.length + 1;
    setForm(f => ({
      ...f,
      instructions: [...f.instructions, { step: nextStep, description: "" }]
    }));
  };

  const removeInstruction = (index) => {
    setForm(f => ({
      ...f,
      instructions: f.instructions.filter((_, i) => i !== index).map((inst, i) => ({ ...inst, step: i + 1 }))
    }));
  };

  const updateInstruction = (index, field, value) => {
    setForm(f => ({
      ...f,
      instructions: f.instructions.map((inst, i) => 
        i === index ? { ...inst, [field]: value } : inst
      )
    }));
  };

  const addTag = () => {
    setForm(f => ({
      ...f,
      tags: [...f.tags, ""]
    }));
  };

  const removeTag = (index) => {
    setForm(f => ({
      ...f,
      tags: f.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTag = (index, value) => {
    setForm(f => ({
      ...f,
      tags: f.tags.map((tag, i) => i === index ? value : tag)
    }));
  };

  const toggleTimeToEat = (time) => {
    setForm(f => ({
      ...f,
      bestTimeToEat: f.bestTimeToEat.includes(time) 
        ? f.bestTimeToEat.filter(t => t !== time)
        : [...f.bestTimeToEat, time]
    }));
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Food Management</h1>
        
        {statusMessage.text && (
          <div className={`mb-4 p-4 rounded ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {statusMessage.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={fetchFoods}
          >
            Refresh Foods
          </button>
          <div className={`px-3 py-1 rounded text-sm ${apiStatus.working ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            API Status: {apiStatus.working ? 'Working' : 'Not Working'}
          </div>
          <button 
            className="btn btn-primary flex items-center gap-2 ml-auto sm:ml-0"
            onClick={openAddModal}
          >
            <span className="font-bold">+</span> Add Food
          </button>
        </div>
      </div>
      
      {/* Enhanced Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{editingId ? "Edit Food" : "Add New Food"}</h3>
                    <p className="text-orange-100 text-sm">Manage your food recipe information</p>
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
                  <label className="form-label">Food Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Enter food name"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Origin *</label>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={e => setForm(f => ({ ...f, origin: e.target.value }))}
                    placeholder="Enter origin"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Category and Cuisine */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="form-input"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snacks">Snacks</option>
                    <option value="sweets">Sweets</option>
                    <option value="beverages">Beverages</option>
                    <option value="traditional">Traditional</option>
                    <option value="street-food">Street Food</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Cuisine *</label>
                  <select
                    value={form.cuisine}
                    onChange={e => setForm(f => ({ ...f, cuisine: e.target.value }))}
                    className="form-input"
                  >
                    <option value="chhattisgarhi">Chhattisgarhi</option>
                    <option value="north-indian">North Indian</option>
                    <option value="south-indian">South Indian</option>
                    <option value="east-indian">East Indian</option>
                    <option value="west-indian">West Indian</option>
                    <option value="continental">Continental</option>
                    <option value="chinese">Chinese</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Difficulty *</label>
                  <select
                    value={form.difficulty}
                    onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}
                    className="form-input"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div className="form-group">
                <label className="form-label">Short Description</label>
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))}
                  placeholder="Brief description (max 200 characters)"
                  maxLength="200"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <SimpleRichTextEditor
                  value={form.description}
                  onChange={value => setForm(f => ({ ...f, description: value }))}
                  placeholder="Enter detailed description..."
                />
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label className="form-label">Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    id="food-image-upload"
                  />
                  <label htmlFor="food-image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <Image 
                        src={previewImage} 
                        alt="Preview" 
                        width={400}
                        height={192}
                        className="w-full max-h-48 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Time and Servings */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="form-group">
                  <label className="form-label">Prep Time (min) *</label>
                  <input
                    type="number"
                    value={form.prepTime}
                    onChange={e => setForm(f => ({ ...f, prepTime: e.target.value }))}
                    placeholder="0"
                    min="0"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Cook Time (min) *</label>
                  <input
                    type="number"
                    value={form.cookTime}
                    onChange={e => setForm(f => ({ ...f, cookTime: e.target.value }))}
                    placeholder="0"
                    min="0"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Servings *</label>
                  <input
                    type="number"
                    value={form.servings}
                    onChange={e => setForm(f => ({ ...f, servings: e.target.value }))}
                    placeholder="1"
                    min="1"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
                    placeholder="0.0"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Ingredients */}
              <div className="form-group">
                <div className="flex justify-between items-center mb-4">
                  <label className="form-label">Ingredients</label>
                  <button 
                    type="button"
                    onClick={addIngredient}
                    className="btn btn-secondary text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Ingredient
                  </button>
                </div>
                <div className="space-y-4">
                  {form.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">Ingredient {index + 1}</h4>
                        {form.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="btn btn-danger text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-group">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            value={ingredient.name}
                            onChange={e => updateIngredient(index, 'name', e.target.value)}
                            placeholder="Ingredient name"
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Quantity</label>
                          <input
                            type="text"
                            value={ingredient.quantity}
                            onChange={e => updateIngredient(index, 'quantity', e.target.value)}
                            placeholder="1, 2, 1/2"
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Unit</label>
                          <input
                            type="text"
                            value={ingredient.unit}
                            onChange={e => updateIngredient(index, 'unit', e.target.value)}
                            placeholder="cup, tsp, kg"
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="form-group">
                <div className="flex justify-between items-center mb-4">
                  <label className="form-label">Instructions</label>
                  <button 
                    type="button"
                    onClick={addInstruction}
                    className="btn btn-secondary text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Step
                  </button>
                </div>
                <div className="space-y-4">
                  {form.instructions.map((instruction, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">Step {instruction.step}</h4>
                        {form.instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInstruction(index)}
                            className="btn btn-danger text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                          value={instruction.description}
                          onChange={e => updateInstruction(index, 'description', e.target.value)}
                          placeholder="Describe this step..."
                          rows="3"
                          className="form-input form-textarea"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Information */}
              <div className="form-group">
                <label className="form-label">Nutrition Information (per serving)</label>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="form-group">
                    <label className="form-label text-xs">Calories</label>
                    <input
                      type="number"
                      value={form.nutrition.calories}
                      onChange={e => setForm(f => ({ ...f, nutrition: { ...f.nutrition, calories: e.target.value } }))}
                      placeholder="0"
                      min="0"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Protein (g)</label>
                    <input
                      type="number"
                      value={form.nutrition.protein}
                      onChange={e => setForm(f => ({ ...f, nutrition: { ...f.nutrition, protein: e.target.value } }))}
                      placeholder="0"
                      min="0"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Carbs (g)</label>
                    <input
                      type="number"
                      value={form.nutrition.carbs}
                      onChange={e => setForm(f => ({ ...f, nutrition: { ...f.nutrition, carbs: e.target.value } }))}
                      placeholder="0"
                      min="0"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Fat (g)</label>
                    <input
                      type="number"
                      value={form.nutrition.fat}
                      onChange={e => setForm(f => ({ ...f, nutrition: { ...f.nutrition, fat: e.target.value } }))}
                      placeholder="0"
                      min="0"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Fiber (g)</label>
                    <input
                      type="number"
                      value={form.nutrition.fiber}
                      onChange={e => setForm(f => ({ ...f, nutrition: { ...f.nutrition, fiber: e.target.value } }))}
                      placeholder="0"
                      min="0"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Sugar (g)</label>
                    <input
                      type="number"
                      value={form.nutrition.sugar}
                      onChange={e => setForm(f => ({ ...f, nutrition: { ...f.nutrition, sugar: e.target.value } }))}
                      placeholder="0"
                      min="0"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="form-group">
                <div className="flex justify-between items-center mb-4">
                  <label className="form-label">Tags</label>
                  <button 
                    type="button"
                    onClick={addTag}
                    className="btn btn-secondary text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Tag
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {form.tags.map((tag, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={e => updateTag(index, e.target.value)}
                        placeholder="Enter tag"
                        className="form-input flex-1"
                      />
                      {form.tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="btn btn-danger text-sm px-3"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">History</label>
                  <textarea
                    value={form.history}
                    onChange={e => setForm(f => ({ ...f, history: e.target.value }))}
                    placeholder="Historical background..."
                    rows="4"
                    className="form-input form-textarea"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Cultural Significance</label>
                  <textarea
                    value={form.culturalSignificance}
                    onChange={e => setForm(f => ({ ...f, culturalSignificance: e.target.value }))}
                    placeholder="Cultural importance..."
                    rows="4"
                    className="form-input form-textarea"
                  />
                </div>
              </div>

              {/* Additional Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-group">
                  <label className="form-label">Season</label>
                  <select
                    value={form.season}
                    onChange={e => setForm(f => ({ ...f, season: e.target.value }))}
                    className="form-input"
                  >
                    <option value="all-season">All Season</option>
                    <option value="summer">Summer</option>
                    <option value="winter">Winter</option>
                    <option value="monsoon">Monsoon</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Price Range</label>
                  <select
                    value={form.priceRange}
                    onChange={e => setForm(f => ({ ...f, priceRange: e.target.value }))}
                    className="form-input"
                  >
                    <option value="budget">Budget</option>
                    <option value="moderate">Moderate</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="form-input"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Best Time to Eat */}
              <div className="form-group">
                <label className="form-label">Best Time to Eat</label>
                <div className="flex flex-wrap gap-3">
                  {['morning', 'afternoon', 'evening', 'night', 'breakfast', 'lunch', 'dinner', 'anytime'].map(time => (
                    <label key={time} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.bestTimeToEat.includes(time)}
                        onChange={() => toggleTimeToEat(time)}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dietary Flags */}
              <div className="form-group">
                <label className="form-label">Dietary Properties</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isVegetarian}
                      onChange={e => setForm(f => ({ ...f, isVegetarian: e.target.checked }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Vegetarian</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isVegan}
                      onChange={e => setForm(f => ({ ...f, isVegan: e.target.checked }))}
                      className="rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Vegan</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isGlutenFree}
                      onChange={e => setForm(f => ({ ...f, isGlutenFree: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Gluten-Free</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>
              </div>

              {/* Spice Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isSpicy}
                    onChange={e => setForm(f => ({ ...f, isSpicy: e.target.checked }))}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Spicy</span>
                </label>
                {form.isSpicy && (
                  <div className="form-group">
                    <label className="form-label">Spice Level (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={form.spiceLevel}
                      onChange={e => setForm(f => ({ ...f, spiceLevel: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                )}
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
                    {editingId ? 'Update Food' : 'Add Food'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Foods Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Cuisine</th>
              <th>Difficulty</th>
              <th>Time</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
                      <Image
                        src={food.image || '/placeholder-food.jpg'}
                        alt={food.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{food.name}</div>
                      <div className="text-sm text-gray-500">{food.origin}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="status-badge">
                    {food.category}
                  </span>
                </td>
                <td>{food.cuisine?.replace('-', ' ')}</td>
                <td>
                  <span className={`status-badge ${food.difficulty === 'easy' ? 'status-active' : food.difficulty === 'hard' ? 'status-inactive' : 'status-pending'}`}>
                    {food.difficulty}
                  </span>
                </td>
                <td>{(food.prepTime || 0) + (food.cookTime || 0)} min</td>
                <td>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {food.rating || 0}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${food.status === 'published' ? 'status-active' : food.status === 'archived' ? 'status-inactive' : 'status-pending'}`}>
                    {food.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(food)} 
                      className="btn btn-secondary text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFood(food._id)}
                      className="btn btn-danger text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {foods.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No foods found. Add your first food recipe!
          </div>
        )}
      </div>
    </div>
  );
}
