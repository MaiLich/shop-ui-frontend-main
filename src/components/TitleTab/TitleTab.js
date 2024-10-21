import { Helmet } from 'react-helmet';

function TitleTab({ title }) {
    return (
        <Helmet>
            {/* Các thẻ meta và title khác nếu cần */}
            <title>{title}</title> {/* Đảm bảo title trong Helmet được cập nhật */}
        </Helmet>
    );
}

export default TitleTab;
