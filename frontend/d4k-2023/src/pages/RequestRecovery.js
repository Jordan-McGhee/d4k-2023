import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserApi } from '../api/userApi'
import { Button, Input } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt, faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const RequestRecovery = () => {
    const navigate = useNavigate()
    const { sendRecoverySms, isUserApiLoading } = UserApi()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        if (!phoneNumber) {
            setError('Please enter a phone number')
            return
        }

        try {
            setError('')
            await sendRecoverySms(phoneNumber)
            setSubmitted(true)
        } catch (err) {
            setError(err.message || 'Error sending recovery SMS')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
            <div className="w-full max-w-md">
                <Button 
                    isIconOnly
                    className="bg-transparent text-white mb-4"
                    onPress={() => navigate('/order')}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </Button>

                {!submitted ? (
                    <div className="flex flex-col gap-6">
                        <div className="text-center">
                            <h1 className="text-white text-3xl font-bungee mb-2">Recover Account</h1>
                            <p className="text-gray-300 font-semibold">
                                Have you already ordered? <br/> Enter your phone number to receive a recovery link via text
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Input
                                type="tel"
                                placeholder="(555) 123-4567"
                                value={phoneNumber}
                                onValueChange={setPhoneNumber}
                                startContent={
                                    <FontAwesomeIcon icon={faMobileAlt} className="text-gray-400" />
                                }
                                classNames={{
                                    input: "text-lg",
                                    inputWrapper: "bg-white rounded-lg"
                                }}
                            />

                            {error && (
                                <p className="text-red-400 text-sm font-semibold">{error}</p>
                            )}

                            <Button
                                className="bg-emerald-600 text-white font-bold text-lg rounded-full py-6"
                                isLoading={isUserApiLoading}
                                isDisabled={isUserApiLoading || !phoneNumber}
                                onPress={handleSubmit}
                            >
                                Send Recovery Link <FontAwesomeIcon icon={faPaperPlane} rotation={180} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="text-emerald-500 text-6xl">📱</div>
                        <h1 className="text-white text-3xl font-bungee">Check Your SMS!</h1>
                        <p className="text-gray-300 font-semibold">
                            If an account exists with this phone number, you'll receive a recovery link via SMS. The link expires in 24 hours.
                        </p>
                        <Button
                            className="bg-blue-600 text-white font-bold rounded-full mt-4"
                            onPress={() => navigate('/order')}
                        >
                            Back to Order
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RequestRecovery
