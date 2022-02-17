import './index.css'

const AllFilters = props => {
  const {employmentData, salaryData} = props
  const EmploymentTypes = data => {
    const {label, employmentTypeId} = data

    return (
      <li>
        <input type="checkbox" id={employmentTypeId} />
        <label htmlFor={employmentTypeId} className="label">
          {label}
        </label>
      </li>
    )
  }

  const SalaryRanges = eachData => {
    const {salaryRangeId, label} = eachData

    return (
      <li>
        <input type="radio" id={salaryRangeId} />
        <label className="label" htmlFor={salaryRangeId}>
          {label}
        </label>
      </li>
    )
  }

  return (
    <div>
      <div>
        <h1>Type of Employment</h1>
        <ul>{employmentData.map(eachItem => EmploymentTypes(eachItem))}</ul>
      </div>
      <hr />
      <div>
        <h1>Salary Range</h1>
        <ul>{salaryData.map(eachItem => SalaryRanges(eachItem))}</ul>
      </div>
    </div>
  )
}

export default AllFilters
