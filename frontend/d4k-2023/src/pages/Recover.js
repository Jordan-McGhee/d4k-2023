import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserApi } from '../api/userApi'
import { Button, Spinner } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheckCircle, faPhone, faPhoneAlt, faRefresh, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Recover = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const { verifyRecoveryToken, isUserApiLoading } = UserApi()
    const [status, setStatus] = useState('loading') // loading, success, error
    const [error, setError] = useState('')

    useEffect(() => {
        const recoverAccount = async () => {
            if (!token) {
                setStatus('error')
                setError('Invalid recovery link')
                return
            }

            try {
                const response = await verifyRecoveryToken(token)
                
                if (response?.user_id) {
                    // Store userId in localStorage
                    localStorage.setItem('userId', response.user_id)
                    setStatus('success')
                    
                    // Redirect to Order page after 2 seconds
                    setTimeout(() => {
                        navigate('/order')
                    }, 2000)
                } else {
                    setStatus('error')
                    setError('Unable to recover account')
                }
            } catch (err) {
                setStatus('error')
                setError(err.message || 'Recovery link is invalid or expired')
            }
        }

        recoverAccount()
    }, [token, navigate])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
            <div className="w-full max-w-md">
                {status === 'loading' && (
                    <div className="flex flex-col items-center gap-4">
                        <Spinner size="lg" color="success" />
                        <p className="text-white text-lg font-bungee">Recovering your account...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <FontAwesomeIcon 
                            icon={faCheckCircle} 
                            className="text-emerald-500 text-6xl"
                        />
                        <h1 className="text-white text-3xl font-bungee">Account Recovered!</h1>
                        <p className="text-gray-300 font-semibold">Redirecting to the order page...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <FontAwesomeIcon 
                            icon={faTimesCircle} 
                            className="text-red-500 text-6xl"
                        />
                        <h1 className="text-white text-3xl font-bungee">Recovery Failed</h1>
                        <h1 className="text-white text-xl font-bungee">Son of a nutcracker!</h1>
                        <p className="text-gray-300 font-semibold">{error}</p>
                        <div className="flex gap-4 mt-6 flex-wrap justify-center">
                            <Button 
                                className="bg-emerald-600 text-white font-bold rounded-full"
                                onPress={() => navigate('/order')}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Order
                            </Button>
                            <Button 
                                className="bg-emerald-600 text-white font-bold rounded-full"
                                onPress={() => navigate('/request-recovery')}
                            >
                                Try Again <FontAwesomeIcon icon={faPhoneAlt} rotation={180} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Recover
