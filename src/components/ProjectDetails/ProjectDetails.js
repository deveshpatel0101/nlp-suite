import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Input, Button } from '@material-ui/core';
import './ProjectDetails.css';

import { getByDay } from '../../controllers/time';
import { getRequests } from '../../controllers/requests';
import { getToken } from '../../controllers/tokens';
import { userLogOut } from '../../redux/actions/user';

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      data: {},
      secretToken: '',
    };
  }

  handleShowToken = () => {
    this.setState({ hidden: !this.state.hidden, secretToken: !this.state.hidden ? '' : '' });
    if (this.state.hidden) {
      getToken(this.props.name).then((res) => {
        if (!res.error) {
          this.setState({ secretToken: res.results.secretToken });
        }
      });
    }
  };

  componentDidMount() {
    getRequests(this.props.name).then((res) => {
      if (res.error) {
        this.props.dispatch(userLogOut());
        return;
      }

      for (let key in res) {
        const sorted = getByDay(res[key]['datasets'][0]['data']);
        res[key]['datasets'][0]['data'] = sorted.count;
        res[key]['labels'] = sorted.labels;
      }
      this.setState({ data: res });
    });
  }

  render() {
    const { data, hidden } = this.state;
    return (
      <div className='Project-Details-Content'>
        <div className='Allowed-Apis'>
          <b>API</b>: <span>{this.props.allowedApis.join(', ')}</span>
        </div>
        <div className='Secret-Token'>
          <div className='Secret-Token-Header'>
            <b>Secret Token</b>:
          </div>
          <div className='Secret-Token-Button'>
            <Button size='small' onClick={this.handleShowToken}>
              {hidden ? 'Show' : 'Hide'}
            </Button>
          </div>
          <div className='Secret-Token-Input'>
            <Input
              value={this.state.secretToken}
              disabled={this.state.hidden}
              placeholder='Secret Token'
              inputProps={{
                'aria-label': 'description',
              }}
            />
          </div>
        </div>
        <div className='Graphs-Container'>
          <div className='Graph'>
            {Object.keys(data).map((endPoint, index) => {
              return (
                <div key={index}>
                  <Bar
                    data={data[endPoint]}
                    options={{
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                      },
                      maintainAspectRatio: true,
                    }}
                    className='Bar'
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDetails;
