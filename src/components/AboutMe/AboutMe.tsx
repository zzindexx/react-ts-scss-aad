import * as React from 'react';
import { AADHttpService } from '../../classes/AADHttpService';
import './AboutMe.scss';

interface UserInfo {
    displayName: string;
    jobTitle: string;
    mail: string;
    officeLocation: string;
    mobilePhone: string;
    businessPhones: string[];
}

export const AboutMe: React.FunctionComponent = () => {
    const httpClient: AADHttpService = new AADHttpService();

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [userInfo, setUserInfo] = React.useState<UserInfo>({ displayName: "", jobTitle: "", mail: "", mobilePhone: "", officeLocation: "", businessPhones: [] });
    const [photoShow, setPhotoShow] = React.useState<boolean>(false);
    const [photo, setPhoto] = React.useState<string>("");

    React.useEffect(() => {
        httpClient.get("https://graph.microsoft.com/v1.0/me/")
            .then(resp => resp.json())
            .then((data: UserInfo) => {
                setIsLoading(false);
                setUserInfo(data);
            });
        httpClient.get("https://graph.microsoft.com/v1.0/me/photos/240x240/$value").then(resp => {
            if (resp.ok) {
                resp.blob().then((pic: Blob) => {
                    pic.arrayBuffer().then(arrayBuffer => {
                        setPhoto(`data:${resp.headers.get('Content-Type')};base64, ${Buffer.from(arrayBuffer).toString('base64')}`);
                        setPhotoShow(true);
                    });
                });
            }
        });
    }, []);

    return <div className="aboutblock">
        <div className="container">
            {isLoading && <div className="row justify-content-center"><div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div></div>}
            {!isLoading && <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                {photoShow && <img src={photo} alt={`${userInfo.displayName} photo`} className="rounded-circle" width="150" />}
                                <div className="mt-3">
                                    <h4>{userInfo.displayName}</h4>
                                    <p className="text-secondary mb-1">{userInfo.jobTitle}</p>
                                    <p className="text-muted font-size-sm">{userInfo.officeLocation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Mail</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {userInfo.mail}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Mobile phone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {userInfo.mobilePhone}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Business phones</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {userInfo.businessPhones.join(", ")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    </div>;
};