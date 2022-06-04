import React from 'react';
import { useIPFS } from '../support/Helpers';

const NFTDetailsImage = ({image_link, alt_text=""}) => {
    image_link = useIPFS(image_link);
    return (
        <div>
            <div className="card text-mute bg-secondary mb-3 mt-6" >
                <div className="card-header"><i className="far fa-heart float-end"></i></div>
                <div className="card-body p-0">
                    <div className='mpl-image'>
                        <img src={image_link} alt={alt_text} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTDetailsImage;