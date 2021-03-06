import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const activityStore = useContext(ActivityStore);
    const {activity: activity, openEditForm, cancelSelectedActivity, loadActivity, loadingInitial} = activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity...' />

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{activity!.title}</Card.Header>
            <Card.Meta>
                <span>{activity!.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity!.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => openEditForm(activity!.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default observer(ActivityDetails);
