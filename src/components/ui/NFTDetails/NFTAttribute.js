import React from 'react';

const NFTAttribute = ({attribute}) => {
    return (
        <div>
            <div className='mpl-feature py-4 px-0 border-propertise'>
                <div className='text-uppercase attribute-type'>
                    {attribute.trait_type}
                </div>
                <div className='text-mute attribute-value'>
                    {attribute.value}
                </div>
            </div>
        </div>
    );
};

export default NFTAttribute;