import React, { useEffect } from 'react';
import { Actions } from '../components/Actions';
import { ImagesContainer } from '../components/ImagesContainer';
import { useDispatch } from 'react-redux';
import { terminal } from '../terminal/Terminal';
import { setValue } from '../redux/reducers/imageReducer';

export const ImageGallery = () => {
    const dispatch = useDispatch();

    //initial load of user and the images from backend
    useEffect(() => {
        terminal.request({ name: 'registerUser' }).then((res) => {
            // user session is successfull then load the images
            if (res.status === 200) {
                terminal.request({ name: 'getAllImages' }).then(({ data }) => {
                    if (data) {
                        dispatch(setValue({ target: 'images', value: data }));
                    }
                }).catch((err) => console.log(err));
            }
        }).catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='flex flex-col w-full h-full shadow-xl rounded-md bg-white py-4'>
            <Actions />
            <ImagesContainer />
        </div>
    );
};
