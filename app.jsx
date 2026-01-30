import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Clock, Star, ChevronDown, Filter, X, Send } from 'lucide-react';

// Sample data
const jobsData = [
  { 
    id: 1, 
    title: 'Hospitality Manager', 
    location: 'Lord Howe Island, NSW', 
    region: 'NSW',
    salary: '$65k - $75k', 
    type: 'Full-time', 
    category: 'Management',
    description: 'Lead our boutique island resort team in delivering exceptional guest experiences.',
    accommodation: true,
    visaSponsorship: true,
    employer: 'Paradise Island Resort'
  },
  { 
    id: 2, 
    title: 'Eco-Tourism Guide', 
    location: 'Great Barrier Reef, QLD', 
    region: 'QLD',
    salary: '$55k - $62k', 
    type: 'Seasonal', 
    category: 'Tourism',
    description: 'Share your passion for marine life with guests on daily reef expeditions.',
    accommodation: true,
    visaSponsorship: true,
    employer: 'Reef Adventures Co'
  },
  { 
    id: 3, 
    title: 'Executive Chef', 
    location: 'Margaret River, WA', 
    region: 'WA',
    salary: '$70k - $85k', 
    type: 'Full-time', 
    category: 'Culinary',
    description: 'Create farm-to-table dining experiences in wine country.',
    accommodation: false,
    visaSponsorship: true,
    employer: 'Vineyard Estate Lodge'
  },
  { 
    id: 4, 
    title: 'Guest Services Coordinator', 
    location: 'Whitsunday Islands, QLD', 
    region: 'QLD',
    salary: '$52k - $58k', 
    type: 'Contract', 
    category: 'Hospitality',
    description: 'Be the friendly face that makes every guest feel at home in paradise.',
    accommodation: true,
    visaSponsorship: false,
    employer: 'Whitsunday Retreat'
  },
  { 
    id: 5, 
    title: 'Wilderness Ranger', 
    location: 'Kakadu National Park, NT', 
    region: 'NT',
    salary: '$58k - $68k', 
    type: 'Full-time', 
    category: 'Conservation',
    description: 'Protect and preserve ancient landscapes while educating visitors.',
    accommodation: true,
    visaSponsorship: true,
    employer: 'National Parks Australia'
  },
  { 
    id: 6, 
    title: 'Spa Therapist', 
    location: 'Cradle Mountain, TAS', 
    region: 'TAS',
    salary: '$50k - $60k', 
    type: 'Full-time', 
    category: 'Wellness',
    description: 'Deliver rejuvenating treatments in our award-winning mountain spa.',
    accommodation: true,
    visaSponsorship: false,
    employer: 'Alpine Wellness Retreat'
  },
  { 
    id: 7, 
    title: 'Bartender', 
    location: 'Kangaroo Island, SA', 
    region: 'SA',
    salary: '$48k - $55k', 
    type: 'Seasonal', 
    category: 'Hospitality',
    description: 'Craft cocktails while wildlife roams outside your bar window.',
    accommodation: true,
    visaSponsorship: true,
    employer: 'Island Escape Lodge'
  },
  { 
    id: 8, 
    title: 'Adventure Activities Coordinator', 
    location: 'Blue Mountains, NSW', 
    region: 'NSW',
    salary: '$54k - $62k', 
    type: 'Full-time', 
    category: 'Tourism',
    description: 'Lead hiking, abseiling, and rock climbing experiences for guests.',
    accommodation: false,
    visaSponsorship: true,
    employer: 'Mountain Adventures Ltd'
  },
];

const reviewsData = [
  {
    id: 1,
    employer: 'Paradise Island Resort',
    location: 'Lord Howe Island, NSW',
    rating: 5,
    position: 'Front Desk Manager',
    reviewer: 'Sarah M.',
    date: 'December 2023',
    pros: 'Stunning location, supportive management, great team culture, accommodation provided',
    cons: 'Limited internet connectivity, can feel isolated during off-season',
    review: 'Six months at a lodge in Tasmania changed my life. The work was challenging but the sunrises over Cradle Mountain made every early shift worth it. Management truly cared about our wellbeing.',
    workLifeBalance: 4,
    management: 5,
    culture: 5,
    benefits: 5
  },
  {
    id: 2,
    employer: 'Reef Adventures Co',
    location: 'Great Barrier Reef, QLD',
    rating: 5,
    position: 'Marine Guide',
    reviewer: 'James T.',
    date: 'November 2023',
    pros: 'Amazing marine life encounters, professional team, excellent training program',
    cons: 'Physically demanding, early morning starts, seasonal work only',
    review: 'Working in the Outback was the adventure I needed. The team became family, and I learned more about hospitality here than in any city hotel.',
    workLifeBalance: 4,
    management: 5,
    culture: 5,
    benefits: 4
  },
  {
    id: 3,
    employer: 'Vineyard Estate Lodge',
    location: 'Margaret River, WA',
    rating: 4,
    position: 'Sous Chef',
    reviewer: 'Emma L.',
    date: 'October 2023',
    pros: 'Beautiful location, great tips, access to local produce, creative freedom',
    cons: 'Long hours during peak season, limited wifi, can be isolating',
    review: 'Beautiful location and great tips, but be prepared for limited wifi and long hours during peak season. Still, waking up to kangaroos outside my window made it unforgettable.',
    workLifeBalance: 3,
    management: 4,
    culture: 4,
    benefits: 4
  },
];

const destinationsData = [
  { name: 'Daintree Rainforest', region: 'QLD', jobs: 12, image: 'tropical' },
  { name: 'Kangaroo Island', region: 'SA', jobs: 8, image: 'coastal' },
  { name: 'Kimberley Region', region: 'WA', jobs: 15, image: 'outback' },
  { name: 'Great Ocean Road', region: 'VIC', jobs: 6, image: 'coastal' },
  { name: 'Cradle Mountain', region: 'TAS', jobs: 9, image: 'mountain' },
  { name: 'Kakadu National Park', region: 'NT', jobs: 11, image: 'wilderness' },
];

export default function WildernessJobsApp() {
  const [activeSection, setActiveSection] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(reviewsData);
  const [selectedEmployerFilter, setSelectedEmployerFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Filter jobs
  useEffect(() => {
    let filtered = jobsData.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.employer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || job.region === selectedRegion;
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesType = selectedType === 'all' || job.type === selectedType;
      
      return matchesSearch && matchesRegion && matchesCategory && matchesType;
    });
    
    setFilteredJobs(filtered);
  }, [searchTerm, selectedRegion, selectedCategory, selectedType]);

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => selectedEmployerFilter === 'all' || review.employer === selectedEmployerFilter)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      return 0;
    });

  const uniqueEmployers = [...new Set(reviews.map(r => r.employer))];

  return (
    <div style={{ fontFamily: "'Libre Franklin', sans-serif", background: '#faf8f3', minHeight: '100vh' }}>
      <style>{`
        :root {
          --sage: #7a9b76;
          --forest: #2d4a2b;
          --sand: #e8dcc4;
          --clay: #b08968;
          --ocean: #4a7c7e;
          --cream: #faf8f3;
          --charcoal: #2b2b2b;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          overflow-x: hidden;
        }

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Libre+Franklin:wght@300;400;500;600&display=swap');
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '1.5rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        background: 'linear-gradient(to bottom, rgba(250, 248, 243, 0.98), rgba(250, 248, 243, 0.8))',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.8rem',
          fontWeight: 500,
          letterSpacing: '1px',
          color: 'var(--forest)'
        }}>
          Wilderness Jobs
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['jobs', 'destinations', 'reviews', 'resources'].map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === section ? 'var(--sage)' : 'var(--charcoal)',
                fontSize: '0.95rem',
                fontWeight: activeSection === section ? 500 : 400,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'color 0.3s ease',
                borderBottom: activeSection === section ? '2px solid var(--sage)' : 'none',
                paddingBottom: '0.25rem'
              }}
            >
              {section}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ paddingTop: '80px' }}>
        {/* Hero Section */}
        <section style={{
          height: '60vh',
          background: 'linear-gradient(135deg, var(--ocean) 0%, var(--sage) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(122, 155, 118, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(74, 124, 126, 0.3) 0%, transparent 50%)',
            opacity: 0.7
          }} />
          <div style={{ textAlign: 'center', zIndex: 1, maxWidth: '900px', padding: '2rem' }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '4.5rem',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1.1,
              marginBottom: '1.5rem'
            }}>
              Work Where Nature Inspires
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--sand)',
              fontWeight: 300,
              letterSpacing: '2px',
              marginBottom: '2rem'
            }}>
              DISCOVER REMOTE OPPORTUNITIES IN AUSTRALIA'S MOST BREATHTAKING LOCATIONS
            </p>
          </div>
        </section>

        {/* Jobs Section */}
        {activeSection === 'jobs' && (
          <section style={{ padding: '4rem 4rem 6rem' }}>
            {/* Search and Filters */}
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}>
                {/* Search Bar */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--clay)',
                      width: '20px'
                    }} />
                    <input
                      type="text"
                      placeholder="Search jobs, locations, or employers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        fontFamily: "'Libre Franklin', sans-serif",
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--sage)'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                      padding: '1rem 2rem',
                      background: showFilters ? 'var(--sage)' : 'white',
                      color: showFilters ? 'white' : 'var(--charcoal)',
                      border: '2px solid var(--sage)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 500,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Filter size={20} />
                    Filters
                  </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: 'var(--cream)',
                    borderRadius: '4px'
                  }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                        Region
                      </label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '4px',
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          background: 'white'
                        }}
                      >
                        <option value="all">All Regions</option>
                        <option value="NSW">New South Wales</option>
                        <option value="QLD">Queensland</option>
                        <option value="WA">Western Australia</option>
                        <option value="NT">Northern Territory</option>
                        <option value="TAS">Tasmania</option>
                        <option value="SA">South Australia</option>
                        <option value="VIC">Victoria</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '4px',
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          background: 'white'
                        }}
                      >
                        <option value="all">All Categories</option>
                        <option value="Management">Management</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Tourism">Tourism</option>
                        <option value="Culinary">Culinary</option>
                        <option value="Conservation">Conservation</option>
                        <option value="Wellness">Wellness</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                        Job Type
                      </label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '4px',
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          background: 'white'
                        }}
                      >
                        <option value="all">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Results Count */}
                <div style={{ marginTop: '1rem', color: 'var(--clay)', fontSize: '0.95rem' }}>
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} found
                </div>
              </div>

              {/* Job Listings */}
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {filteredJobs.map(job => (
                  <div
                    key={job.id}
                    style={{
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '2px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                      e.currentTarget.style.borderColor = 'var(--sage)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '2rem',
                          color: 'var(--forest)',
                          marginBottom: '0.5rem'
                        }}>
                          {job.title}
                        </h3>
                        <div style={{ color: 'var(--clay)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                          {job.employer}
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '2rem',
                          color: '#666',
                          fontSize: '0.9rem',
                          marginBottom: '1rem',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={16} />
                            {job.location}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <DollarSign size={16} />
                            {job.salary}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={16} />
                            {job.type}
                          </span>
                        </div>
                        <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1rem' }}>
                          {job.description}
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <span style={{
                            padding: '0.4rem 1rem',
                            background: 'var(--cream)',
                            color: 'var(--forest)',
                            borderRadius: '20px',
                            fontSize: '0.85rem'
                          }}>
                            {job.category}
                          </span>
                          {job.accommodation && (
                            <span style={{
                              padding: '0.4rem 1rem',
                              background: '#e8f5e9',
                              color: '#2e7d32',
                              borderRadius: '20px',
                              fontSize: '0.85rem'
                            }}>
                              🏠 Accommodation
                            </span>
                          )}
                          {job.visaSponsorship && (
                            <span style={{
                              padding: '0.4rem 1rem',
                              background: '#e3f2fd',
                              color: '#1565c0',
                              borderRadius: '20px',
                              fontSize: '0.85rem'
                            }}>
                              ✈️ Visa Sponsorship
                            </span>
                          )}
                        </div>
                      </div>
                      <button style={{
                        padding: '0.8rem 2rem',
                        background: 'var(--sage)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        letterSpacing: '0.5px',
                        transition: 'all 0.3s ease',
                        marginLeft: '2rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'var(--forest)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'var(--sage)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'white',
                  borderRadius: '8px'
                }}>
                  <p style={{ fontSize: '1.2rem', color: 'var(--clay)', marginBottom: '0.5rem' }}>
                    No jobs found matching your criteria
                  </p>
                  <p style={{ color: '#666' }}>
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Destinations Section */}
        {activeSection === 'destinations' && (
          <section style={{ padding: '4rem 4rem 6rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '3.5rem',
                  fontWeight: 400,
                  color: 'var(--forest)',
                  marginBottom: '1rem'
                }}>
                  Featured Destinations
                </h2>
                <p style={{ color: 'var(--clay)', fontSize: '1.1rem' }}>
                  Luxury lodges and remote resorts where work meets wonder
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '2rem'
              }}>
                {destinationsData.map((dest, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      height: '400px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: `linear-gradient(135deg, var(--ocean) 0%, var(--sage) 100%)`,
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))',
                      zIndex: 1
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '2rem',
                      zIndex: 2,
                      color: 'white'
                    }}>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '2.5rem',
                        marginBottom: '0.5rem',
                        fontWeight: 400
                      }}>
                        {dest.name}
                      </h3>
                      <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                        {dest.region} • {dest.jobs} Active Positions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews Section */}
        {activeSection === 'reviews' && (
          <section style={{ padding: '4rem 4rem 6rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '3.5rem',
                  fontWeight: 400,
                  color: 'var(--forest)',
                  marginBottom: '1rem'
                }}>
                  Employer Reviews
                </h2>
                <p style={{ color: 'var(--clay)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                  Real reviews from people who've lived and worked in remote Australia
                </p>
                <button
                  onClick={() => setShowReviewForm(true)}
                  style={{
                    padding: '1rem 2.5rem',
                    background: 'var(--sage)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'var(--forest)'}
                  onMouseLeave={(e) => e.target.style.background = 'var(--sage)'}
                >
                  Write a Review
                </button>
              </div>

              {/* Filters */}
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                    Filter by Employer
                  </label>
                  <select
                    value={selectedEmployerFilter}
                    onChange={(e) => setSelectedEmployerFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '4px',
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Employers</option>
                    {uniqueEmployers.map(emp => (
                      <option key={emp} value={emp}>{emp}</option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '4px',
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="recent">Most Recent</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Review Cards */}
              <div style={{ display: 'grid', gap: '2rem' }}>
                {filteredReviews.map(review => (
                  <div
                    key={review.id}
                    style={{
                      background: 'white',
                      padding: '2.5rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
                      transition: 'box-shadow 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <div>
                        <h3 style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '2rem',
                          color: 'var(--forest)',
                          marginBottom: '0.25rem'
                        }}>
                          {review.employer}
                        </h3>
                        <p style={{ color: 'var(--clay)', fontSize: '0.95rem' }}>
                          {review.location}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--sand)', fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#999' }}>
                          {review.date}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                        <strong>{review.reviewer}</strong> • {review.position}
                      </div>
                    </div>

                    <p style={{
                      fontStyle: 'italic',
                      color: 'var(--charcoal)',
                      lineHeight: 1.8,
                      marginBottom: '1.5rem',
                      fontSize: '1.05rem'
                    }}>
                      "{review.review}"
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '1rem',
                      padding: '1.5rem',
                      background: 'var(--cream)',
                      borderRadius: '4px',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Work-Life Balance</div>
                        <div style={{ fontSize: '1.2rem', color: 'var(--sage)', fontWeight: 600 }}>
                          {review.workLifeBalance}/5
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Management</div>
                        <div style={{ fontSize: '1.2rem', color: 'var(--sage)', fontWeight: 600 }}>
                          {review.management}/5
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Culture</div>
                        <div style={{ fontSize: '1.2rem', color: 'var(--sage)', fontWeight: 600 }}>
                          {review.culture}/5
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Benefits</div>
                        <div style={{ fontSize: '1.2rem', color: 'var(--sage)', fontWeight: 600 }}>
                          {review.benefits}/5
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--forest)', marginBottom: '0.5rem' }}>
                          👍 Pros
                        </div>
                        <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7 }}>
                          {review.pros}
                        </p>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--forest)', marginBottom: '0.5rem' }}>
                          👎 Cons
                        </div>
                        <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7 }}>
                          {review.cons}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Resources Section */}
        {activeSection === 'resources' && (
          <section style={{ padding: '4rem 4rem 6rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '3.5rem',
                  fontWeight: 400,
                  color: 'var(--forest)',
                  marginBottom: '1rem'
                }}>
                  Resources & Guides
                </h2>
                <p style={{ color: 'var(--clay)', fontSize: '1.1rem' }}>
                  Everything you need to know about working in remote Australia
                </p>
              </div>

              <div style={{ display: 'grid', gap: '2rem' }}>
                {[
                  {
                    title: 'Working Holiday Visa Guide',
                    description: 'Complete information on eligibility, application process, and visa conditions for working in Australia.',
                    icon: '✈️'
                  },
                  {
                    title: 'Remote Living Essentials',
                    description: 'What to pack, how to prepare, and what to expect when living and working in wilderness locations.',
                    icon: '🎒'
                  },
                  {
                    title: 'Salary & Benefits Guide',
                    description: 'Understand typical compensation packages, accommodation arrangements, and additional benefits.',
                    icon: '💰'
                  },
                  {
                    title: 'Safety & Health',
                    description: 'Stay safe in remote environments with our comprehensive health and safety guidelines.',
                    icon: '🏥'
                  },
                  {
                    title: 'Cultural Tips',
                    description: 'Navigate Australian workplace culture and make the most of your remote work experience.',
                    icon: '🤝'
                  },
                  {
                    title: 'FAQs',
                    description: 'Answers to the most common questions about working in remote Australian locations.',
                    icon: '❓'
                  }
                ].map((resource, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'white',
                      padding: '2.5rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      gap: '2rem',
                      alignItems: 'flex-start'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ fontSize: '3rem' }}>{resource.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '2rem',
                        color: 'var(--forest)',
                        marginBottom: '0.75rem'
                      }}>
                        {resource.title}
                      </h3>
                      <p style={{ color: '#666', lineHeight: 1.7 }}>
                        {resource.description}
                      </p>
                    </div>
                    <ChevronDown style={{ transform: 'rotate(-90deg)', color: 'var(--sage)' }} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewFormModal 
          onClose={() => setShowReviewForm(false)}
          onSubmit={(newReview) => {
            setReviews([...reviews, { ...newReview, id: reviews.length + 1 }]);
            setShowReviewForm(false);
          }}
        />
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}

// Review Form Modal Component
function ReviewFormModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    employer: '',
    location: '',
    position: '',
    reviewer: '',
    rating: 5,
    workLifeBalance: 5,
    management: 5,
    culture: 5,
    benefits: 5,
    pros: '',
    cons: '',
    review: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          padding: '2rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            color: 'var(--forest)'
          }}>
            Write a Review
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: 'var(--charcoal)'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Basic Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Employer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.employer}
                  onChange={(e) => setFormData({...formData, employer: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Your Position *
                </label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Your Name/Initials *
                </label>
                <input
                  type="text"
                  required
                  value={formData.reviewer}
                  onChange={(e) => setFormData({...formData, reviewer: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            {/* Overall Rating */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Overall Rating *
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '2rem', color: 'var(--sand)' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    onClick={() => setFormData({...formData, rating: star})}
                    style={{ cursor: 'pointer' }}
                  >
                    {star <= formData.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Ratings */}
            <div>
              <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
                Detailed Ratings
              </label>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {['workLifeBalance', 'management', 'culture', 'benefits'].map(category => (
                  <div key={category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ textTransform: 'capitalize' }}>
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '1.5rem', color: 'var(--sand)' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          onClick={() => setFormData({...formData, [category]: star})}
                          style={{ cursor: 'pointer' }}
                        >
                          {star <= formData[category] ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Your Review *
              </label>
              <textarea
                required
                value={formData.review}
                onChange={(e) => setFormData({...formData, review: e.target.value})}
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                placeholder="Share your experience working at this location..."
              />
            </div>

            {/* Pros and Cons */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Pros *
              </label>
              <textarea
                required
                value={formData.pros}
                onChange={(e) => setFormData({...formData, pros: e.target.value})}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                placeholder="What did you enjoy about working here?"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Cons *
              </label>
              <textarea
                required
                value={formData.cons}
                onChange={(e) => setFormData({...formData, cons: e.target.value})}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                placeholder="What could be improved?"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: '1rem 2rem',
                background: 'var(--sage)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background 0.3s ease',
                marginTop: '1rem'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--forest)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--sage)'}
            >
              <Send size={20} />
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Job Detail Modal Component
function JobDetailModal({ job, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.5rem',
              color: 'var(--forest)',
              marginBottom: '0.5rem'
            }}>
              {job.title}
            </h2>
            <p style={{ color: 'var(--clay)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              {job.employer}
            </p>
            <p style={{ color: '#666' }}>{job.location}</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: 'var(--charcoal)'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'var(--cream)',
            borderRadius: '4px'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Salary</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--forest)' }}>{job.salary}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Job Type</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--forest)' }}>{job.type}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Category</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--forest)' }}>{job.category}</div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.8rem',
              color: 'var(--forest)',
              marginBottom: '1rem'
            }}>
              About This Position
            </h3>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {job.description}
            </p>
            <p style={{ color: '#555', lineHeight: 1.8 }}>
              Join our team in one of Australia's most stunning locations. This role offers the perfect blend of professional growth and adventure, allowing you to develop your skills while immersed in natural beauty. You'll work alongside passionate colleagues who share your love for both excellent service and the great outdoors.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.8rem',
              color: 'var(--forest)',
              marginBottom: '1rem'
            }}>
              What We Offer
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {job.accommodation && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏠</span>
                  <span>Accommodation provided on-site or nearby</span>
                </div>
              )}
              {job.visaSponsorship && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✈️</span>
                  <span>Visa sponsorship available for eligible candidates</span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🌟</span>
                <span>Competitive salary package</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span>
                <span>Professional development opportunities</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🤝</span>
                <span>Supportive team environment</span>
              </div>
            </div>
          </div>

          <button
            style={{
              width: '100%',
              padding: '1.25rem',
              background: 'var(--sage)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 600,
              letterSpacing: '1px',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'var(--forest)'}
            onMouseLeave={(e) => e.target.style.background = 'var(--sage)'}
          >
            Apply for This Position
          </button>
        </div>
      </div>
    </div>
  );
}