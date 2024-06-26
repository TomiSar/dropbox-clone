import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggler } from './ThemeToggler';

function Header() {
  return (
    <header className='flex items-center justify-between'>
      <Link className='flex items-center space-x-2' href='/'>
        <div className='bg-[#0160FE] w-fit'>
          <Image
            className='bg-white'
            height={45}
            width={45}
            style={{ borderRadius: '10px' }}
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/2202px-Dropbox_Icon.svg.png'
            alt='logo'
          />
        </div>
        <h1 className='font-bold text-xl'>Dropbox</h1>
      </Link>
      <div className='px-5 flex space-x-2 items-center'>
        <ThemeToggler />
        <UserButton afterSignOutUrl='/' />
        <SignedOut>
          <SignInButton afterSignInUrl='/dashboard' mode='modal' />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
