import { Routes, Route } from "react-router-dom";

function Footer() {
  return (
      <>
          <footer className="page-footer brown lighten-1" style={{ marginTop: "60px" }}>
              <div className="container center-align white-text">
                  © { new Date().getFullYear() } Your Bakery Admin Panel
              </div>
          </footer>
      </>
  )
}

export default Footer
