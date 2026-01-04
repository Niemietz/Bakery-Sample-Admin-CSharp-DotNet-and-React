import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../services/api.js'

function Home() {
    let [data, setData] = useState(null);
    
    useEffect(async () => {
        console.log("Loading API data...")

        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/data');
            const result = JSON.parse(await response.json());

            console.log("API Response", result)

            return result
        };

        setData(await fetchData())
    }, []); // Empty dependency array means this runs once after mount

    return (
        <>
            <div className="container" style={{ marginTop: "40px" }}>
                  <h4 className="center-align brown-text text-darken-2">Edit Site Content</h4>
                  <form method="POST" action="/api" className="card-panel white z-depth-2">
        
                      <h5 className="brown-text text-darken-2">Hero Section</h5>
                      <div className="input-field">
                          <input id="heroTitle" type="text" name="heroTitle" defaultValue={ (data != null) ? data.hero.title : "" } required />
                          <label htmlFor="heroTitle" className="active">Title</label>
                      </div>
        
                      <div className="input-field">
                          <textarea id="heroSubtitle" className="materialize-textarea" name="heroSubtitle" defaultValue={(data != null) ? data.hero.subtitle : ""} required></textarea>
                          <label htmlFor="heroSubtitle" className="active">Subtitle</label>
                      </div>
        
                      <div className="input-field">
                          <input id="heroCTA" type="text" name="heroCTA" defaultValue={ (data != null) ? data.hero.ctaText : "" } required/>
                          <label htmlFor="heroCTA" className="active">Button Text</label>
                      </div>
        
                      <div className="divider" style={{ margin: "30px 0" }}></div>
        
                      <h5 className="brown-text text-darken-2">Why Choose Us Section</h5>
                      <div className="input-field">
                          <input id="whyChooseUsTitle" type="text" name="whyChooseUsTitle" defaultValue={ (data != null) ? data.sections.whyChooseUs.title : "" } required/>
                          <label htmlFor="whyChooseUsTitle" className="active">Title</label>
                      </div>
        
                      <div className="input-field">
                          <input id="whyChooseUsDescription" type="text" name="whyChooseUsDescription" defaultValue={ (data != null) ? data.sections.whyChooseUs.description : "" } required/>
                          <label htmlFor="whyChooseUsDescription" className="active">Description</label>
                      </div>
        
                      <div className="divider" style={{ margin: "30px 0" }}></div>
        
                      <h5 className="brown-text text-darken-2">Footer Section</h5>
                      <div className="input-field">
                          <input id="visitUs" type="text" name="visitUs" defaultValue={ (data != null) ? data.footer.visitUs : "" } required/>
                          <label htmlFor="visitUs" className="active">Title</label>
                      </div>
        
                      <div className="input-field">
                          <input id="visitUsDescription" type="text" name="visitUsDescription" defaultValue={ (data != null) ? data.footer.visitUsDescription : "" } required/>
                          <label htmlFor="visitUsDescription" className="active">Description</label>
                      </div>
        
                      <div className="input-field">
                          <input id="visitUsCTA" type="text" name="visitUsCTA" defaultValue={ (data != null) ? data.footer.visitUsCta_text : "" } required/>
                          <label htmlFor="visitUsCTA" className="active">Button Text</label>
                      </div>
        
                      <div className="input-field">
                          <input id="address" type="text" name="address" defaultValue={ (data != null) ? data.footer.address : "" } required/>
                          <label htmlFor="address" className="active">Address</label>
                      </div>
        
                      <div className="input-field">
                          <input id="phone" type="text" name="phone" defaultValue={ (data != null) ? data.footer.phone : "" } required/>
                          <label htmlFor="phone" className="active">Phone</label>
                      </div>
        
                      <div className="center-align" style={{ marginTop: "30px" }}>
                          <button type="submit" className="btn-large waves-effect waves-light brown lighten-1">
                              <i className="material-icons left">save</i> Save Changes
                          </button>
                      </div>
                  </form>
            </div>
        </>
    )
}

export default Home
