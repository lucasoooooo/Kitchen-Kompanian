import React from "react";
import { NavLink } from "react-router-dom";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Footer() {
  return (
    <div className="footer">
      <footer className="fixed-bottom">
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<div className="container">
						<ul className="navbar-nav m-auto">
							<li className="nav-item">
								<NavLink className="nav-link" to="/">
									<LocalGroceryStoreIcon className='mui_icon'/>
									<span className="sr-only">(current)</span>
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/kitchenStock">
								 <KitchenIcon className='mui_icon'/>
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/recipies">
								<LocalDiningIcon className='mui_icon'/>
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/myKitchens">
									<PeopleAltIcon className='mui_icon'/>
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