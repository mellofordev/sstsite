import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoginComponent from './LoginComponent';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import profile from '@/pages/profile';
import Footer from './FooterComponent';
export default function ProfileComponent() {
    const router = useRouter();

    const [isLogged, setIsLogged] = useState(false);
    const [token, setToken] = useState(null);
    const [data, setData] = useState([]);
    const [option, setOption] = useState('individual');
    const [loading, setLoading] = useState(true);
    const [updateloading, setUpdateLoading] = useState(false);
    const [close, setClose] = useState(false);
    const departments = ['MEA', 'MEB', 'ECA', 'ECB'];
    const [selectdepartment, setSelectDepartment] = useState('default');
    const [id, setID] = useState(0);
    const [buttonProgramLoading, setButtonProgramLoading] = useState(false);
    const apireq = () => {
        setLoading(true);
        fetch('https://sstapi.pythonanywhere.com/accounts/api/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => response.json())
            .then((resdata) => {
                setData(resdata.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const update = () => {
        console.log(selectdepartment);
        setUpdateLoading(true);
        fetch(`https://sstapi.pythonanywhere.com/accounts/api/profile/update/${selectdepartment}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => response.json())
            .then((resdata) => {
                setClose(true);
                setUpdateLoading(false);
                apireq();
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const deleteEvent = () => {
        setButtonProgramLoading(true);
        fetch(`https://sstapi.pythonanywhere.com//api/program/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => response.json())
            .then((resdata) => {
                toast(resdata.data, {
                    description: 'tip :you can again register for this event if you change your mind',
                    action: {
                        label: 'Close',
                        onClick: () => {
                            console.log('close');
                        },
                    },
                });
                setButtonProgramLoading(false);
                apireq();
                setID(0);
            })
            .catch((e) => {
                console.log(e);
                toast(e, {
                    description: 'tip :you can again register for this event if you change your mind',
                    action: {
                        label: 'Close',
                        onClick: () => {
                            console.log('close');
                        },
                    },
                });
                setID(0);
            });
    };
    const getToken = () => {
        setToken(localStorage.getItem('token'));
        if (localStorage.getItem('token')) {
            setIsLogged(true);
        }
    };
    const logout = () => {
        localStorage.removeItem('token');
        router.reload();
    };

    useEffect(() => {
        getToken();
    }, []);
    useEffect(() => {
        if (token) apireq();
    }, [token]);

    return (
        <div>
            {isLogged == false ? (
                <div className="m-10 flex flex-col justify-items-center">
                    <LoginComponent />
                </div>
            ) : (
                <>
                    {loading == true && (
                        <p
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 34,
                                fontFamily: 'Enhanced LED Board-7',
                            }}
                        >
                            loading...
                        </p>
                    )}
                    <Card className="w-auto bg-gradient-to-r from-cyan-500 to-blue-500 ml-[10px] mr-[10px] mt-[10px]">
                        <CardHeader>
                            <CardTitle className="text-3xl font-medium text-white">{data.name}</CardTitle>
                            <CardDescription className="text-1xl text-white">@{data.username}</CardDescription>
                            <CardDescription className="text-1xl text-white">
                                Department: {data.department} Chest Number: {data.chest_number}{' '}
                            </CardDescription>
                            <Button
                                onClick={() => {
                                    window.open(
                                        `whatsapp://send?phone=+918075496634&text=Hi, my profile data is different  id : ${data.username} name : ${data.name}`,
                                    );
                                }}
                            >
                                Report Issue
                            </Button>

                            {data.department === 'default' && (
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <Button variant="outline">add department</Button>
                                    </DrawerTrigger>
                                    <DrawerContent className="dark text-white">
                                        <div className="h-[300px] w-full ">
                                            <DrawerHeader>
                                                <DrawerTitle>Add your department</DrawerTitle>
                                            </DrawerHeader>
                                            <div className="flex flex-col items-center m-10">
                                                {close === false ? (
                                                    <div className="flex flex-row justify-spaced">
                                                        <Select
                                                            className="dark "
                                                            onValueChange={(value) => setSelectDepartment(value)}
                                                        >
                                                            <SelectTrigger className="w-[180px] dark">
                                                                <SelectValue placeholder="Add your department" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {departments.map((i) => {
                                                                    return (
                                                                        <SelectItem
                                                                            className="dark"
                                                                            key={i.toString()}
                                                                            value={i.toString()}
                                                                        >
                                                                            {i}
                                                                        </SelectItem>
                                                                    );
                                                                })}
                                                            </SelectContent>
                                                        </Select>
                                                        <Button
                                                            disabled={updateloading == true ? true : false}
                                                            className="dark"
                                                            type="submit"
                                                            onClick={() => {
                                                                update();
                                                            }}
                                                        >
                                                            Submit
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h1 className="text-2xl mb-5 text-white">
                                                            Successfully added department 🎉
                                                        </h1>
                                                        <p className="text-1xl mb-5 text-white">
                                                            reload the page to view updated data.
                                                        </p>
                                                        <DrawerClose asChild>
                                                            <Button className="w-[300px]">Close</Button>
                                                        </DrawerClose>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </DrawerContent>
                                </Drawer>
                            )}
                            <Button
                                className="dark"
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Log Out
                            </Button>
                        </CardHeader>
                    </Card>
                    <Tabs defaultValue="Individual" className="dark ml-[10px] mr-[10px] mt-[10px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="Individual" onClick={() => setOption('Individual')}>
                                Individual
                            </TabsTrigger>
                            <TabsTrigger value="Group" onClick={() => setOption('Group')}>
                                Group
                            </TabsTrigger>
                        </TabsList>
                        <ScrollArea>
                            <TabsContent value="Group">
                                {data.group_registered_events && data.group_registered_events.length > 0 ? (
                                    data.group_registered_events.map((i, index) => (
                                        <Card className="w-auto dark mb-5" key={index}>
                                            <CardHeader>
                                                <CardTitle className="text-3xl font-medium">{i.program.name}</CardTitle>
                                                {/* <CardDescription className="text-1xl ">created by {data.name==i.program.created_by ? 'you': i.program.created_by}</CardDescription> */}
                                            </CardHeader>
                                            <Button
                                                onClick={() => {
                                                    setID(i.program.id);
                                                    if (id != 0) deleteEvent();
                                                }}
                                                className="m-5"
                                            >
                                                {data.name == i.program.created_by ? 'Delete team' : 'Leave team'}
                                            </Button>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-white text-center mt-5">No Group registered events found</p>
                                )}
                            </TabsContent>
                        </ScrollArea>
                        <ScrollArea>
                            <TabsContent value="Individual">
                                {data.solo_registered_events && data.solo_registered_events.length > 0 ? (
                                    data.solo_registered_events.map((i, index) => (
                                        <Card className="w-auto dark mb-5" key={index}>
                                            <CardHeader>
                                                <CardTitle className="text-3xl font-medium">{i.program.name}</CardTitle>
                                            </CardHeader>
                                            <Button
                                                onClick={() => {
                                                    setID(i.program.id);
                                                    if (id != 0) deleteEvent();
                                                }}
                                                className="m-5"
                                                disabled={buttonProgramLoading == true ? true : false}
                                            >
                                                {buttonProgramLoading == true ? 'Deleting' : 'Delete'}
                                            </Button>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-white text-center mt-5">No Individual registered events found</p>
                                )}
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                    {loading == false && <Footer />}
                </>
            )}
        </div>
    );
}
