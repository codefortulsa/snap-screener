import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

export const Wizard = (props) => {
  // state
  const [page, changePage] = React.useState(props.startPage)
  const [values, changeValues] = React.useState(props.initialValues || {})

  const activePage = () => React.Children.toArray(props.children)[page]

  const isLastPage = () => page === React.Children.count(props.children) - 1

  const next = (values) => {
    changePage(Math.min(page + 1, props.children.length - 1))
    changeValues(values)
  }

  const previous = () => {
    changePage(Math.max(page - 1, 0))
  }

  const showInputPreview = () => props.showInputPreview

  const showPrevious = () => props.showPrevious

  const previousText = () => props.previousText

  const nextText = () => props.nextText

  const submitText = () => props.submitText

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  const validate = (values) => {
    const active_page = activePage()

    return active_page.props.validate ? active_page.props.validate(values) : {}
  }

  const handleSubmit = (values) => {
    if (isLastPage()) {
      return props.onSubmit(values)
    } else {
      next(values)
    }
  }

  return (
    <Form
      initialValues={values}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          {activePage()}

          <div className="buttons">
            {showPrevious() && page > 0 && (
              <button className="btn" type="button" onClick={previous}>
                {previousText()}
              </button>
            )}
            {!isLastPage() && <button className="btn" type="submit">{nextText()}</button>}
            {isLastPage() && (
              <button className="btn" type="submit" disabled={submitting}>
                {submitText()}
              </button>
            )}
          </div>

          {showInputPreview() && (<pre className="input-preview"><code>{JSON.stringify(values, 0, 2)}</code></pre>)}
        </form>
      )}
    </Form>
  )
}

Wizard.propTypes = {
  startPage: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  showInputPreview: PropTypes.bool,
  showPrevious: PropTypes.bool,
  previousText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  nextText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  submitText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Wizard.defaultProps = {
  startPage: 0,
  showInputPreview: false,
  showPrevious: true,
  previousText: '« Previous',
  nextText: 'Next »',
  submitText: 'Submit',
}

Wizard.Page = ({ children }) => children

export default Wizard
