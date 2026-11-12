
import logging

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .serializers import ChatRequestSerializer
from .services import generate_reply


logger = logging.getLogger(__name__)


class ChatView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        message = serializer.validated_data["message"]
        history = serializer.validated_data.get("history", [])

        try:
            reply = generate_reply(message, history)

        except Exception:
            logger.exception("Emly AI response generation failed.")

            return Response(
                {
                    "error": (
                        "Emly couldn't respond right now. "
                        "Please try again."
                    )
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        return Response({"reply": reply})
