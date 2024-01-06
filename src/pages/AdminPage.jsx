import { useState } from 'react';
import TitleNavbar from '../components/adminpage/TitleNavbar';
import ProductContent from '../components/adminpage/ProductContent';

export default function AdminPage() {
    const [ showContent, setShowContent ] = useState('product');

    return(
        <main className='admin_contanier'>
            <TitleNavbar  showContent={showContent}setShowContent={setShowContent} />
            <div className='admin_content_container'>
                { showContent === 'product' && <ProductContent /> }
            </div>
        </main>
    );
}