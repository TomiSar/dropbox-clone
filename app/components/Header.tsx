import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className='flex items-center justify-between'>
      <Link className='flex items-center space-x-2' href='/'>
        <div className='bg-[#0160FE] w-fit'>
          <Image
            className='bg-white'
            height={50}
            width={50}
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/2202px-Dropbox_Icon.svg.png'
            alt='logo'
          />
        </div>
        <h1 className='font-bold text-xl'>Dropbox</h1>
      </Link>
      <div>
        {/* Theme Toggler */}
        <UserButton afterSignOutUrl='/' />
        <SignedOut>
          <SignInButton afterSignInUrl='/dashboard' mode='modal' />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
