import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LoginComponent from '@/components/LoginComponent';
import BottomNavBarComponent from '@/components/BottomNavBarComponent';

export default function Blog() {
    const router = useRouter();
    const [teamId, setTeamId] = useState(null);
    const [data, setData] = useState({});
    const [routerReady, setRouterReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getToken = () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                setIsLogged(true);
            }
        };
        getToken();
    }, []);

    useEffect(() => {
        if (router.isReady) {
            setRouterReady(true);
            setTeamId(router.query.id); // Update teamId when router is ready
        }
    }, [router.isReady, router.query.id]);

    useEffect(() => {
        if (routerReady && token && teamId) {
            const controller = new AbortController();
            getTeam(controller.signal);
            return () => {
                controller.abort();
            };
        }
    }, [routerReady, token, teamId]);

    const getTeam = (signal) => {
        setLoading(true);
        fetch(`https://sstapi.pythonanywhere.com/api/team/members/${teamId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            signal: signal,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.data == 'Team does not exits') {
                    toast(data.data, {
                        description: 'tip :you can see your registerations in profile',
                        action: {
                            label: 'Close',
                            onClick: () => {
                                console.log('close');
                            },
                        },
                    });
                } else {
                    setData(data.data);
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const joinTeam = () => {
        fetch(`https://sstapi.pythonanywhere.com/api/team/join/${teamId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                toast(data.data, {
                    description: '',
                    action: {
                        label: 'Close',
                        onClick: () => {
                            console.log('close');
                        },
                    },
                });
                getTeam();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div>
            <h1>Team</h1>
            {!isLogged ? (
                <div className="m-10 flex flex-col justify-items-center">
                    <h1
                        style={{ color: 'white', fontSize: 55, fontWeight: 'bold', marginTop: 55 }}
                        className="text-white "
                    >
                        Team
                    </h1>
                    <p className="text-white mb-[10px]">Login it to view the team</p>
                    <LoginComponent />
                </div>
            ) : (
                <div className="flex flex-col justify-items-center m-[10px]">
                    {loading ? (
                        <h1 className="text-2xl text-center text-white">loading...</h1>
                    ) : (
                        <>
                            <h1 style={{ color: 'white', fontSize: 55, fontWeight: 'bold' }}>Team</h1>
                            <h1 className="text-2xl text-white">{data.program}</h1>
                            <p className="text-1xl text-slate-200 mb-[10px]">Created by {data.team_lead}</p>
                            <ScrollArea>
                                {data.members && data.members.length === 0 && (
                                    <Card className="w-auto dark m-5">
                                        <CardHeader>
                                            <CardTitle className="text-2xl font-medium">
                                                No members in your team
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                )}
                                {data.members &&
                                    data.members.map((i, index) => {
                                        return (
                                            <Card className="w-auto dark mb-5" key={index}>
                                                <CardHeader>
                                                    <CardTitle className="text-3xl font-medium">{i}</CardTitle>
                                                </CardHeader>
                                            </Card>
                                        );
                                    })}
                            </ScrollArea>
                            <Button className="dark mb-20" onClick={joinTeam}>
                                Join Team
                            </Button>
                        </>
                    )}
                </div>
            )}
            <BottomNavBarComponent />
        </div>
    );
}
