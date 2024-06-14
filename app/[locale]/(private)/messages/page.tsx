import { FaMessage, FaPlus } from 'react-icons/fa6';
import Image from 'next/image';
import { DEFAULT_IMG } from '@/lib/constants';
import { FaSearch } from 'react-icons/fa';

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
    ];

    return (
        <>
            <div className='under-navbar text-center'>
                <section className='message-section glass-card'>
                    <div className='message-sidebar'>
                        <div className='message__title'>
                            <h2>Beérkezett üzenetek</h2>
                            <FaMessage />
                        </div>
                        <form className='message-search'>
                            <div className='search-input'>
                                <input type='text' placeholder='keresés' />
                                <button>
                                    <FaSearch />
                                </button>
                            </div>
                            <button className='glass-card p-2'>
                                <FaPlus />
                            </button>
                        </form>
                        <div className='message__header-wrapper'>
                            {messages.map((message, i) => (
                                <div className={`message__header-item ${i === 2 ? 'active' : ''}`} key={message.id}>
                                    <div className='header__img'>
                                        <Image src={message.img} alt={message.name} width={40} height={40} />
                                    </div>
                                    <div className='header__body'>
                                        <h4 className='header__sender-name'>{message.name}</h4>
                                        <p className='header__message'>{message.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='message-wrapper'>
                        <div className='message'>fasf</div>
                    </div>
                </section>
            </div>
        </>
    );
}
