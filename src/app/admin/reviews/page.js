"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReviewsApi from '../../coreApi/ReviewsApi';
import config from '../../config';

const API_URL = config.ENDPOINTS.REVIEWS;

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    authorEmail: '',
    authorAvatar: '',
    rating: 5,
    category: 'restaurant',
    locationName: '',
    locationCity: '',
    locationState: 'Chhattisgarh',
    locationAddress: '',
    itemReviewedName: '',
    itemReviewedType: 'restaurant',
    itemReviewedPriceRange: 'moderate',
    itemReviewedPhone: '',
    itemReviewedEmail: '',
    itemReviewedWebsite: '',
    highlights: [],
    pros: [],
    cons: [],
    tags: [],
    visitDate: new Date().toISOString().split('T')[0],
    visitDuration: 'full-day',
    groupSize: 1,
    budget: '',
    wheelchairAccessible: false,
    parkingAvailable: false,
    publicTransportAccess: false,
    verified: false,
    featured: false,
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    keywords: []
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Fetch reviews
  async function fetchReviews() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      const data = await res.json();
      setReviews(data.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setStatusMessage({ 
        type: 'error', 
        text: `Failed to connect to backend server. Please make sure the backend is running at ${API_URL}` 
      });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  function openAddModal() {
    setForm({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: '',
      authorEmail: '',
      authorAvatar: '',
      rating: 5,
      category: 'restaurant',
      locationName: '',
      locationCity: '',
      locationState: 'Chhattisgarh',
      locationAddress: '',
      itemReviewedName: '',
      itemReviewedType: 'restaurant',
      itemReviewedPriceRange: 'moderate',
      itemReviewedPhone: '',
      itemReviewedEmail: '',
      itemReviewedWebsite: '',
      highlights: [],
      pros: [],
      cons: [],
      tags: [],
      visitDate: new Date().toISOString().split('T')[0],
      visitDuration: 'full-day',
      groupSize: 1,
      budget: '',
      wheelchairAccessible: false,
      parkingAvailable: false,
      publicTransportAccess: false,
      verified: false,
      featured: false,
      status: 'draft',
      metaTitle: '',
      metaDescription: '',
      keywords: []
    });
    setPreviewImage(null);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEditModal(review) {
    setForm({
      title: review.title || '',
      excerpt: review.excerpt || '',
      content: review.content || '',
      image: review.image || '',
      author: review.author || '',
      authorEmail: review.authorEmail || '',
      authorAvatar: review.authorAvatar || '',
      rating: review.rating || 5,
      category: review.category || 'restaurant',
      locationName: review.location?.name || '',
      locationCity: review.location?.city || '',
      locationState: review.location?.state || 'Chhattisgarh',
      locationAddress: review.location?.address || '',
      itemReviewedName: review.itemReviewed?.name || '',
      itemReviewedType: review.itemReviewed?.type || 'restaurant',
      itemReviewedPriceRange: review.itemReviewed?.priceRange || 'moderate',
      itemReviewedPhone: review.itemReviewed?.contact?.phone || '',
      itemReviewedEmail: review.itemReviewed?.contact?.email || '',
      itemReviewedWebsite: review.itemReviewed?.contact?.website || '',
      highlights: review.highlights || [],
      pros: review.pros || [],
      cons: review.cons || [],
      tags: review.tags || [],
      visitDate: review.visitDate ? new Date(review.visitDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      visitDuration: review.visitDuration || 'full-day',
      groupSize: review.groupSize || 1,
      budget: review.budget || '',
      wheelchairAccessible: review.accessibility?.wheelchairAccessible || false,
      parkingAvailable: review.accessibility?.parkingAvailable || false,
      publicTransportAccess: review.accessibility?.publicTransportAccess || false,
      verified: review.verified || false,
      featured: review.featured || false,
      status: review.status || 'draft',
      metaTitle: review.seo?.metaTitle || '',
      metaDescription: review.seo?.metaDescription || '',
      keywords: review.seo?.keywords || []
    });
    
    // Set preview image with proper URL
    const imageUrl = review.image ? 
      (review.image.startsWith('http') ? review.image : `${config.API_BASE_URL.replace('/api', '')}${review.image}`) : 
      null;
    setPreviewImage(imageUrl);
    
    setEditingId(review._id);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: '',
      authorEmail: '',
      authorAvatar: '',
      rating: 5,
      category: 'restaurant',
      locationName: '',
      locationCity: '',
      locationState: 'Chhattisgarh',
      locationAddress: '',
      itemReviewedName: '',
      itemReviewedType: 'restaurant',
      itemReviewedPriceRange: 'moderate',
      itemReviewedPhone: '',
      itemReviewedEmail: '',
      itemReviewedWebsite: '',
      highlights: [],
      pros: [],
      cons: [],
      tags: [],
      visitDate: new Date().toISOString().split('T')[0],
      visitDuration: 'full-day',
      groupSize: 1,
      budget: '',
      wheelchairAccessible: false,
      parkingAvailable: false,
      publicTransportAccess: false,
      verified: false,
      featured: false,
      status: 'draft',
      metaTitle: '',
      metaDescription: '',
      keywords: []
    });
    setPreviewImage(null);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setForm(f => ({ ...f, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  function addArrayItem(field) {
    setForm(f => ({ ...f, [field]: [...f[field], ''] }));
  }

  function updateArrayItem(field, index, value) {
    setForm(f => ({
      ...f,
      [field]: f[field].map((item, i) => i === index ? value : item)
    }));
  }

  function removeArrayItem(field, index) {
    setForm(f => ({
      ...f,
      [field]: f[field].filter((_, i) => i !== index)
    }));
  }

  async function handleModalOk() {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Add all form fields to FormData
      Object.keys(form).forEach(key => {
        if (key === 'highlights' || key === 'pros' || key === 'cons' || key === 'tags' || key === 'keywords') {
          formData.append(key, JSON.stringify(form[key]));
        } else if (key === 'image' && form[key] instanceof File) {
          formData.append('image', form[key]);
        } else if (key === 'image' && typeof form[key] === 'string' && form[key]) {
          formData.append('existingImage', form[key]);
        } else if (form[key] !== null && form[key] !== undefined && form[key] !== '') {
          formData.append(key, form[key]);
        }
      });

      let response;
      if (editingId) {
        response = await ReviewsApi.updateReviewWithImage(editingId, formData);
      } else {
        response = await ReviewsApi.createReviewWithImage(formData);
      }

      if (response.success) {
        setStatusMessage({ 
          type: 'success', 
          text: editingId ? 'Review updated successfully!' : 'Review created successfully!' 
        });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
        closeModal();
        fetchReviews();
      } else {
        throw new Error(response.message || 'Failed to save review');
      }
    } catch (error) {
      console.error('Error saving review:', error);
      setStatusMessage({ 
        type: 'error', 
        text: `Error: ${error.message}` 
      });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    setLoading(true);
    try {
      const response = await ReviewsApi.deleteReview(id);
      if (response.success) {
        setStatusMessage({ 
          type: 'success', 
          text: 'Review deleted successfully!' 
        });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
        fetchReviews();
      } else {
        throw new Error(response.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      setStatusMessage({ 
        type: 'error', 
        text: `Error: ${error.message}` 
      });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
        <button 
          onClick={openAddModal}
          className="btn btn-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Review
        </button>
      </div>

      {statusMessage.text && (
        <div className={`notification ${statusMessage.type} mb-6`}>
          {statusMessage.text}
        </div>
      )}

      {loading && reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>
                    <div className="font-medium text-gray-900">{review.title}</div>
                    <div className="text-sm text-gray-500">{review.excerpt}</div>
                  </td>
                  <td>{review.author}</td>
                  <td>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {review.category}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{review.rating}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${review.status === 'published' ? 'active' : 'inactive'}`}>
                      {review.status}
                    </span>
                  </td>
                  <td>
                    {review.featured ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(review)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(review._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{editingId ? "Edit Review" : "Add New Review"}</h3>
                    <p className="text-yellow-100 text-sm">Manage your review content and details</p>
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
                  <label className="form-label">Review Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Enter review title"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Author *</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                    placeholder="Enter author name"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Excerpt *</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Enter review excerpt"
                  rows="3"
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Content *</label>
                <textarea
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  placeholder="Enter review content (HTML supported)"
                  rows="8"
                  className="form-textarea"
                />
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label className="form-label">Review Image *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {previewImage ? (
                      <Image src={previewImage} alt="Preview" width={128} height={128} className="mx-auto h-32 w-auto rounded-lg" />
                    ) : (
                      <div>
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">Click to upload image</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Rating and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Rating *</label>
                  <select
                    value={form.rating}
                    onChange={e => setForm(f => ({ ...f, rating: parseFloat(e.target.value) }))}
                    className="form-input"
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="form-input"
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="hotel">Hotel</option>
                    <option value="attraction">Attraction</option>
                    <option value="event">Event</option>
                    <option value="food">Food</option>
                    <option value="adventure">Adventure</option>
                    <option value="culture">Culture</option>
                    <option value="shopping">Shopping</option>
                    <option value="transport">Transport</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Location Information */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Location Information</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Location Name *</label>
                      <input
                        type="text"
                        value={form.locationName}
                        onChange={e => setForm(f => ({ ...f, locationName: e.target.value }))}
                        placeholder="Enter location name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        value={form.locationCity}
                        onChange={e => setForm(f => ({ ...f, locationCity: e.target.value }))}
                        placeholder="Enter city"
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      value={form.locationAddress}
                      onChange={e => setForm(f => ({ ...f, locationAddress: e.target.value }))}
                      placeholder="Enter full address"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Item Reviewed */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Item Reviewed</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Item Name *</label>
                      <input
                        type="text"
                        value={form.itemReviewedName}
                        onChange={e => setForm(f => ({ ...f, itemReviewedName: e.target.value }))}
                        placeholder="Enter item name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Item Type *</label>
                      <select
                        value={form.itemReviewedType}
                        onChange={e => setForm(f => ({ ...f, itemReviewedType: e.target.value }))}
                        className="form-input"
                      >
                        <option value="restaurant">Restaurant</option>
                        <option value="hotel">Hotel</option>
                        <option value="attraction">Attraction</option>
                        <option value="event">Event</option>
                        <option value="food">Food</option>
                        <option value="adventure">Adventure</option>
                        <option value="culture">Culture</option>
                        <option value="shopping">Shopping</option>
                        <option value="transport">Transport</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price Range</label>
                    <select
                      value={form.itemReviewedPriceRange}
                      onChange={e => setForm(f => ({ ...f, itemReviewedPriceRange: e.target.value }))}
                      className="form-input"
                    >
                      <option value="free">Free</option>
                      <option value="budget">Budget</option>
                      <option value="moderate">Moderate</option>
                      <option value="premium">Premium</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Visit Information */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Visit Information</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-group">
                      <label className="form-label">Visit Date *</label>
                      <input
                        type="date"
                        value={form.visitDate}
                        onChange={e => setForm(f => ({ ...f, visitDate: e.target.value }))}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration</label>
                      <select
                        value={form.visitDuration}
                        onChange={e => setForm(f => ({ ...f, visitDuration: e.target.value }))}
                        className="form-input"
                      >
                        <option value="few-hours">Few Hours</option>
                        <option value="half-day">Half Day</option>
                        <option value="full-day">Full Day</option>
                        <option value="weekend">Weekend</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Group Size</label>
                      <input
                        type="number"
                        value={form.groupSize}
                        onChange={e => setForm(f => ({ ...f, groupSize: parseInt(e.target.value) || 1 }))}
                        min="1"
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget (₹)</label>
                    <input
                      type="number"
                      value={form.budget}
                      onChange={e => setForm(f => ({ ...f, budget: parseFloat(e.target.value) || '' }))}
                      placeholder="Enter budget amount"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Highlights, Pros, Cons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Highlights</h3>
                  </div>
                  <div className="p-6 space-y-2">
                    {form.highlights.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={e => updateArrayItem('highlights', index, e.target.value)}
                          placeholder="Enter highlight"
                          className="form-input flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('highlights', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('highlights')}
                      className="btn btn-secondary w-full"
                    >
                      Add Highlight
                    </button>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Pros</h3>
                  </div>
                  <div className="p-6 space-y-2">
                    {form.pros.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={e => updateArrayItem('pros', index, e.target.value)}
                          placeholder="Enter pro"
                          className="form-input flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('pros', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('pros')}
                      className="btn btn-secondary w-full"
                    >
                      Add Pro
                    </button>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Cons</h3>
                  </div>
                  <div className="p-6 space-y-2">
                    {form.cons.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={e => updateArrayItem('cons', index, e.target.value)}
                          placeholder="Enter con"
                          className="form-input flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('cons', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('cons')}
                      className="btn btn-secondary w-full"
                    >
                      Add Con
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="form-group">
                <label className="form-label">Tags</label>
                <div className="space-y-2">
                  {form.tags.map((tag, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={e => updateArrayItem('tags', index, e.target.value)}
                        placeholder="Enter tag"
                        className="form-input flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('tags', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('tags')}
                    className="btn btn-secondary"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Accessibility */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Accessibility</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={form.wheelchairAccessible}
                        onChange={e => setForm(f => ({ ...f, wheelchairAccessible: e.target.checked }))}
                        className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Wheelchair Accessible</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={form.parkingAvailable}
                        onChange={e => setForm(f => ({ ...f, parkingAvailable: e.target.checked }))}
                        className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Parking Available</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={form.publicTransportAccess}
                        onChange={e => setForm(f => ({ ...f, publicTransportAccess: e.target.checked }))}
                        className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Public Transport Access</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Status and Settings */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Status and Settings</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={form.featured}
                          onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                          className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Featured</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={form.verified}
                          onChange={e => setForm(f => ({ ...f, verified: e.target.checked }))}
                          className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Verified</span>
                      </label>
                    </div>
                  </div>
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
                onClick={handleModalOk}
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
                    {editingId ? 'Update Review' : 'Add Review'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
