import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Михаил Яцук</p>
            {/*<p>&copy; {new Date().getFullYear()} ГУ «Центр по обеспечению деятельности бюджетных организаций Бешенковичского района»</p>*/}
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#ffffff',
        padding: '1px',
        textAlign: 'center',
        position: 'sticky',
        left: '0',
        bottom: '0',
        width: '100%',
    },
};

export default Footer;
