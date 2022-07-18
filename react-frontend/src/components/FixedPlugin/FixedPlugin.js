import React from 'react'
import { Badge, Button, Dropdown, Form } from 'react-bootstrap'

function FixedPlugin({
    hasImage, setHasImage, color, setColor, image, setImage,
}) {
    return (
        <div className='fixed-plugin'>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-fixed-plugin" variant="" className='text-white border-0 opacity-100'>
                    <i className="fas fa-cogs fa-2x mt-1"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <li className='adjustments-line d-flex align-items-center justify-content-between'>
                       <p>Background image</p>
                       <Form.Check type="switch" id="custom-switch-1-image" checked={hasImage} onChange={setHasImage}/> 
                    </li>
                    <li className="adjustments-line mt-3">
                        <p>Filter</p>
                        <div className='pull-right'>
                            <Badge variant="secondary" className={color==="black" ? "active": ""}
                                onClick={() => setColor("black")}></Badge>
                            <Badge variant="azure" className={color === "azure" ? "active": ""}
                                onClick={()=>setColor('azure')}></Badge>
                            <Badge variant="green" className={color==="green" ? "active": ""}
                                onClick={()=>setColor("green")}></Badge>
                            <Badge variant="orange" className={color==="orange" ? "active": ""}
                                onClick={()=>setColor("orange")}></Badge>
                            <Badge variant="red" className={color==="red" ? "active": ""}
                                onClick={()=>setColor("red")}></Badge>
                            <Badge variant="purple" className={color==="purple" ? "active": ""}
                                onClick={()=>setColor("purple")}></Badge>
                        </div>
                        <div className="clearfix"></div>
                    </li>
                    <li className="header-title">Sidebar Images</li>
                    <li className={image===sideBarImage1 ? "active": ""}>
                        <a className="img-holder switch-trigger d-block" href="#pablo"
                            onClick={(e) => {e.preventDefault(); setImage(sideBarImage1)}}>
                            <img alt="..." src={sideBarImage1}></img>
                        </a>
                    </li>
                    <li className={image===sideBarImage2 ? "active": ""}>
                        <a className="img-holder switch-trigger d-block" href="#pablo"
                            onClick={(e) => {e.preventDefault(); setImage(sideBarImage2)}}>
                            <img alt="..." src={sideBarImage2}></img>
                        </a>
                    </li>
                    <li className={image===sideBarImage3 ? "active": ""}>
                        <a className="img-holder switch-trigger d-block" href="#pablo"
                            onClick={(e) => {e.preventDefault(); setImage(sideBarImage3)}}>
                            <img alt="..." src={sideBarImage3}></img>
                        </a>
                    </li>
                    <li className={image===sideBarImage4 ? "active": ""}>
                        <a className="img-holder switch-trigger d-block" href="#pablo"
                            onClick={(e) => {e.preventDefault(); setImage(sideBarImage4)}}>
                            <img alt="..." src={sideBarImage4}></img>
                        </a>
                    </li>
                    <li className='button-container'>
                        <div>
                            <Button block clasName="btn-fill" href="#" rel="noopener noreferrer" target="_blank" variant="info">Free</Button>
                        </div>
                    </li>
                    <li className="header-title" id = "shareTitle">Mike Williams x Mesto remix</li>
                    <li className='button-container mb-4'>
                        <Button className='btn-social btn-outline btn-round' id="twitter" variant="twitter">
                            <i className='fab fa-twitter'></i>
                        </Button>
                    </li>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default FixedPlugin;


