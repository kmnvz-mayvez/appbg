import React from 'react';

function Header() {
    return (
        <div className="container">
            <div className="row flex align-items-center bg-light col-xxl-10 mx-auto py-4">
                <div className="col-lg-4 ms-lg-4">
                    <div style={{}} className="lc-block mb-4">
                        <img className="img-fluid shadow" src="https://images.unsplash.com/photo-1525004866327-07739b938272?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTZ8fGJ1aWxkaW5nfGVufDB8Mnx8fDE2MzQ1NTA4MDc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080" alt="Photo by Kaloyan Draganov" />
                    </div>
                </div>
                <div className="col-lg-7 ps-lg-4">
                    <div className="lc-block">
                        <div>
                            <h1 className="rfs-30 fw-bold">MEGA MALL PARKING APP</h1>
                        </div>
                    </div>
                    <div className="lc-block mb-4">
                        <div>
                            <p className="lead">Creat account for fast payment and fast In no need ticketing anymore </p>
                        </div>
                    </div>
                    <div className="lc-block">
                        <div>
                            <p className="lead-xl p-2">admin account admin, password123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Header };
