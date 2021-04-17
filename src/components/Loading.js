import React from 'react';

const ComponentLoading = () => (
    <div className="loading">
        <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only" />
        </div>
    </div>
);

const PageLoading = () => (
    <div className="loading-page">
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
);

export { ComponentLoading, PageLoading };
