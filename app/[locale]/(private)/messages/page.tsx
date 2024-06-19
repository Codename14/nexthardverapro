import { DEFAULT_IMG } from '@/lib/constants';
import Image from 'next/image';
import MessageDetails from './MessageDetails';

export default function Page() {
    const messages = [
        {
            id: 1,
            name: 'Nemeth Kinga',
            message: 'Lorem ipsum dolor sit amet.',
            img: DEFAULT_IMG,
        },
        {
            id: 2,
            name: 'John Doe',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: DEFAULT_IMG,
        },
        {
            id: 3,
            name: 'Jane Smith',
            message: 'Nulla facilisi.',
            img: DEFAULT_IMG,
        },
        {
            id: 4,
            name: 'Bob Johnson',
            message: 'Quisque rhoncus.',
            img: DEFAULT_IMG,
        },
        {
            id: 5,
            name: 'Sarah Williams',
            message: 'In hac habitasse platea dictumst.',
            img: DEFAULT_IMG,
        },
        {
            id: 6,
            name: 'Michael Brown',
            message: 'Donec ut mauris eget massa tempor convallis.',
            img: DEFAULT_IMG,
        },
        {
            id: 7,
            name: 'David Smith',
            message: 'Maecenas sed diam eget risus varius blandit sit amet non magna.',
            img: DEFAULT_IMG,
        },
        {
            id: 8,
            name: 'Elizabeth Johnson',
            message: 'Donec id elit non mi porta gravida at eget metus.',
            img: DEFAULT_IMG,
        },
        {
            id: 9,
            name: 'William Wilson',
            message: 'Nulla vitae elit libero, a pharetra augue.',
            img: DEFAULT_IMG,
        },
        {
            id: 10,
            name: 'Sophia Davis',
            message: 'Etiam porta sem malesuada magna mollis euismod.',
            img: DEFAULT_IMG,
        },
        {
            id: 11,
            name: 'Daniel Martinez',
            message: 'Sed posuere consectetur est at lobortis.',
            img: DEFAULT_IMG,
        },
        {
            id: 12,
            name: 'Olivia Taylor',
            message: 'Aenean lacinia bibendum nulla sed consectetur.',
            img: DEFAULT_IMG,
        },
        {
            id: 13,
            name: 'Ethan Hernandez',
            message: 'Donec id elit non mi porta gravida at eget metus.',
            img: DEFAULT_IMG,
        },
        {
            id: 14,
            name: 'Ava Thompson',
            message: 'Maecenas faucibus mollis interdum.',
            img: DEFAULT_IMG,
        },
        {
            id: 15,
            name: 'Michael Lee',
            message: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
            img: DEFAULT_IMG,
        },
    ];

    return (
        <>
            <div className='under-navbar text-center'>
                <section className='message-section  screen-container'>
                    <div className='message-sidebar'>
                        <form className='message-search'>
                            <div className='search-input'>
                                <input type='text' placeholder='keresés' />
                            </div>
                        </form>
                        <div className='message__header-wrapper'>
                            {messages.map((message, i) => (
                                <div className={`message__header-item ${i === 2 ? 'active' : ''}`} key={message.id}>
                                    <div className='header__img'>
                                        <Image src={message.img} alt={message.name} fill />
                                    </div>
                                    <div className='header__body'>
                                        <h4 className='header__sender-name'>{message.name}</h4>
                                        <p className='header__message'>{message.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <MessageDetails />
                </section>
            </div>
        </>
    );
}
