import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <footer className="fixed-bottom">
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<div className="container">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<NavLink className="nav-link" to="/">
									Grocery List
									<span className="sr-only">(current)</span>
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/kitchenStock">
									Kitchen Stock
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/recipies">
									Recipes
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/myKitchens">
									My Kitchens
								</NavLink>
							</li>
						</ul>
					</div>
				</nav>
      </footer>
    </div>
  );
}

export default Footer;