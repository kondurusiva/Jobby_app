import {Link} from 'react-router-dom'
import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
    id,
  } = similarJobs

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <img src={companyLogoUrl} alt="company logo" />
        <h1>{title}</h1>
        <p>{rating}</p>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <p>{location}</p>
        <p>{employmentType}</p>
      </Link>
    </li>
  )
}
export default SimilarJobs
