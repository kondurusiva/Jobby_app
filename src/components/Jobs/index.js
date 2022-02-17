import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsSearch} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import AllFilters from '../AllFilters'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    profileData: {},
    apiProfileStatus: apiStatusConstant.initial,
    jobsApiStatus: apiStatusConstant.initial,
    jobsData: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    if (response.ok) {
      this.setState({
        profileData: updatedData,
        apiProfileStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiProfileStatus: apiStatusConstant.failure})
    }
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.jobs.map(singleJob => ({
        companyLogoUrl: singleJob.company_logo_url,
        employmentType: singleJob.employment_type,
        id: singleJob.id,
        jobDescription: singleJob.job_description,
        location: singleJob.location,
        packagePerAnnum: singleJob.package_per_annum,
        rating: singleJob.rating,
        title: singleJob.title,
      }))
      this.setState({
        jobsData: updatedData,
        jobsApiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstant.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDataSuccess = () => {
    const {jobsData} = this.state
    return jobsData.map(eachItem => (
      <ul>
        <Link key={eachItem.id} to={`/jobs/${eachItem.id}`}>
          <li className="jobs-list">
            <div>
              <div className="top-container">
                <img src={eachItem.companyLogoUrl} alt="company logo" />
                <div className="title-container">
                  <h1>{eachItem.title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="fill-star" />
                    <p>{eachItem.rating}</p>
                  </div>
                </div>
              </div>
              <div className="address-container">
                <div className="jobType-container">
                  <div className="location">
                    <MdLocationOn />
                    <p>{eachItem.location}</p>
                  </div>
                  <div className="employment-type">
                    <BsBriefcaseFill />
                    <p>{eachItem.employmentType}</p>
                  </div>
                </div>
                <p className="package">{eachItem.packagePerAnnum}</p>
              </div>
              <hr />
              <div className="description-container">
                <h1>Description</h1>
                <p>{eachItem.jobDescription}</p>
              </div>
            </div>
          </li>
        </Link>
      </ul>
    ))
  }

  renderProfileDataSuccess = () => {
    const {profileData} = this.state
    return (
      <div className="profile-container">
        <img src={profileData.profileImageUrl} alt="profile" />
        <h1 className="profile-name">{profileData.name}</h1>
        <p className="profile-bio">{profileData.shortBio}</p>
      </div>
    )
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <input
          className="search-input"
          type="search"
          value={searchInput}
          placeholder="Search"
        />
        <button className="search-btn" type="button">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="filter-job-container">
          <div className="filters-container">
            {this.renderProfileDataSuccess()}
            <AllFilters
              salaryData={salaryRangesList}
              employmentData={employmentTypesList}
            />
          </div>
          <div>
            {this.renderSearchInput()}
            {this.renderJobDataSuccess()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
