import React from 'react';
import NFTAttribute from './NFTAttribute';
import "./NFTDetails.css";

const NFTAttributesList = ({attributes, columnSize, loading}) => {
    if (columnSize===null || typeof columnSize==="undefined") {
        columnSize=4;
    }
    
    return (
        <div>
            <div className="card text-mute bg-secondary mb-3 mt-6 accordion"  id="accordionParentThree">
                <div className="card-header text-mute pointer collapse-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePropertise" aria-expanded="false" aria-controls="collapsePropertise">
                    Propertise
                </div>
                
                <div className="card-body collapse" id='collapsePropertise' data-bs-parent="#accordionParentThree">
                    <div className='row'>
                        
                        { attributes.map(attribute => (
                            
                            <div className={`col-md-${columnSize}`} key={attribute.trait_type}>
                                <NFTAttribute attribute={attribute} />
                            </div>
                        ))
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTAttributesList;