import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Contact</h1>
             <form action="https://getform.io/f/2d41679e-e775-465f-8721-89ab85d0bfa9" method="POST">
                <input type="text" name="name">
                <input type="email" name="email">
                <input type="text" name="message">
                <!-- checkbox handle --> 
                <input type="checkbox" name="subscribe" value="yes" checked>
                <input type="hidden" name="subscribe" value="no">
                <!-- radio button handle --> 
                <input type="radio" name="gender" value="male" checked>
                <input type="radio" name="gender" value="female">
                <input type="radio" name="gender" value="other">
                <!-- select field handle --> 
                <select name="work-experience">
                    <option value="one-year">0-1 years</option>
                    <option value="one-five-years">1-5 years</option>
                    <option value="five-plus-years">5+ years</option>
                </select>
                <button type="submit">Send</button>
            </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
