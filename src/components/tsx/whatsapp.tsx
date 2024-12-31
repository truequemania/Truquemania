function WhatsAppFloatingButton() {
    return (
        <div className="fixed bottom-5 right-5 z-50">
            <a
                href="https://wa.me/56964720520"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-8 h-8"
                />
            </a>
        </div>
    );
}

export default WhatsAppFloatingButton;
