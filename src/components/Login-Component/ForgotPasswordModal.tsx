import Input from "../CustomInput";

type ForgotPasswordModalProps = {
  showForgotModal: boolean;
  forgotEmail: string;
  setForgotEmail: (email: string) => void;
  handleContinue: () => void;
};

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  showForgotModal,
  forgotEmail,
  setForgotEmail,
  handleContinue,
}) => {
  return (
    <div>
      {showForgotModal && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center z-50">
          <div className="bg-white/90 backdrop-blur-sm w-[400px] h-[200px] p-4 rounded-md shadow-xl flex flex-col justify-between border border-purple-300">
            <div>
              <h3 className="text-lg font-bold mb-2 text-center">
                Forgot Password
              </h3>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Kindly input your registered mail.
              </p>

              <Input
                type="email"
                placeholder="Email"
                name="Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleContinue}
              className="w-[60%] mx-auto py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordModal;
